var Config = require("./Config");

var lock = require("./lock");

var DatabaseConnection = require("./DatabaseConnection");

var BigInteger = require("big-integer");
var Types = require("./ServerTypes");
var Point = Types.Point;
var BoundingBox = Types.BoundingBox;
var Window = Types.Window;
var WindowTree = Types.WindowTree;

var BigCanvasDefinitions = require("./BigCanvasDefinitions");
var _ = require("underscore");

var Users = require("./data/Users");
var Actions = require("./data/Actions");
var Tiles = require("./data/Tiles");
var Deltas = require("./data/Deltas");

var socketIds = BigInteger(0);
function BigCanvasSocket(wsSocket, userId) {
  var id = socketIds.toString(),
      window = null;
  socketIds = socketIds.next();
  this.getId = function() { return id; };
  this.send = function(obj) { wsSocket.send(JSON.stringify(obj)); };
  this.getUserId = function() { return userId; };
  this.close = function(obj) { wsSocket.close(); };
  this.getWindow = function() { return window; };
  this.setWindow = function(win) { window = win; };
}

function BigCanvas() {
  var self = this;
  var sockets = {};
  var windowTree = new WindowTree();

  function lockCanvas(callback) {
    lock("canvas", callback);
  }

  //setup server stub
  this.Server = new BigCanvasDefinitions.Interfaces.Main.Server({
    connect: function(socket) {
      sockets[socket.getId()] = socket;
    },
    disconnect: function(socket) {
      //remove window from tree
      var oldWindow = socket.getWindow(),
          socketId = socket.getId();
      if(oldWindow != null)
        windowTree.removeWindow(oldWindow, socketId);
      //delete from sockets list
      delete sockets[socketId];
    },
    //remote procedure call implementations
    setWindow: function(socket, x, y, width, height, callback) {
      try {
        var oldWindow = socket.getWindow(),
          newWindow = new Window(x, y, width, height),
          socketId = socket.getId();
        //reset window
        if(oldWindow != null)
          windowTree.removeWindow(oldWindow, socketId);
        windowTree.addWindow(newWindow, socketId);
        callback();
      } catch(ex) {
        callback(ex);
      }
    },
    sendAction: function(socket, action, callback) {
      var server = this;
      function broadcastAction(actionId, action, userId, region) {
        var socketIds = windowTree.getWindowsByRegion(region);
        _.each(socketIds, function(socketId) {
          var socket = sockets[socketId];
          if(socket) //TODO dirty...
            server.onAction(socket, userId, actionId, action, region);
        });
      }

      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); callback(err); return; }
        var locks = [],
            userId = socket.getUserId();
        function unlock() {
          connection.end();
          _.each(locks, function(done) { done(); });
          locks = [];
        }
        function success(actionId) {
          unlock();
          callback(null, actionId);
        }
        function fail(ex) {
          unlock();
          callback(ex);
        }

        //lock canvas
        lockCanvas(function(canvasDone) {
          locks.unshift(canvasDone);
          //lock user
          Users.lock(userId, function(userDone) {
            //save unlock callback
            locks.unshift(userDone);
            //get user
            Users.get(connection, userId, function(err, user) {
              //handle error
              if(err) { fail(err); return; }
              //handle action
              switch(action.type) {
                case "BRUSH":
                case "ERASER":
                  //check if stroke <= BoundingBox(4096x4096)
                  var maxSize = Config.ACTION_MAX_STROKE_SIZE,
                    width = BigInteger(action.width),
                    opacity = action.opacity,
                    bb = new BoundingBox(),
                    stroke = _.map(action.stroke, function(point) {
                      return new Point(point.x, point.y);
                    });
                  _.each(stroke, function(point) { bb.addPoint(point); });
                  bb.extend(Math.ceil(width / 2));
                  if(bb.getWidth().greater(maxSize) || bb.getHeight().greater(maxSize)) {
                    fail(new Error("Stroke is too big."));
                    return;
                  }

                  function performAction(newActionId, previousActionId) {
                    Deltas.draw(connection, action, function(err, regionPaths) {
                      if(err) { fail(err); return; }
                      try {
                        //get region
                        var region = _.map(regionPaths, function(location, path) { return location; });
                        //lock region
                        Tiles.lock(region, function(tilesDone) {
                          //save unlock callback
                          locks.unshift(tilesDone);
                          //start transaction
                          var transaction = connection.startTransaction();
                          function rollback(err) {
                            transaction.rollback();
                            Deltas.deleteRegionPaths(regionPaths);
                            fail(err);
                          }
                          function commit(rslt) {
                            transaction.commit(function(err, info) {
                              if(err) {
                                Deltas.deleteRegionPaths(regionPaths);
                                fail(err);
                              } else {
                                success(rslt);
                                broadcastAction(newActionId, action, userId, region);
                              }
                            });
                          }
                          //TODO commit jobs
                          Deltas.commit(transaction, regionPaths, newActionId, function(err) {
                            if(err) { rollback(err); return; }
                            Actions.create(transaction, newActionId, action, userId, previousActionId, region, function(err) {
                              if(err) { rollback(err); return; }
                              Users.setLastActionId(transaction, userId, newActionId, function(err) {
                                if(err) { rollback(err); return; }
                                Tiles.appendAction(transaction, region, newActionId, function(err) {
                                  if(err) { rollback(err); return; }
                                  Users.incrementUsageStatistics(transaction, userId, action.type, function(err) {
                                    if(err) { rollback(err); return; }
                                    if(previousActionId !== "-1") {
                                      Actions.setNextActionId(transaction, previousActionId, newActionId, function(err) {
                                        if(err) { rollback(err); return; }
                                        commit(newActionId);
                                      });
                                    } else {
                                      Users.setFirstActionId(transaction, userId, newActionId, function(err) {
                                        if(err) { rollback(err); return; }
                                        commit(newActionId);
                                      });
                                    }
                                  });
                                });
                              });
                            });
                          });
                          transaction.execute();
                        });
                      } catch(ex) {
                        fail(ex);
                      }
                    });
                  }
                  //get new action id
                  Actions.newId(connection, function(err, newActionId) {
                    if(err) { fail(err); return; }
                    //read user.lastAction
                    Users.get(connection, userId, function(err, user) {
                      if(err) { fail(err); return; }
                      var noLastAction = user.lastActionId === "-1";
                      //lock new Action
                      Actions.lock(newActionId, function(newActionDone) {
                        locks.unshift(newActionDone);
                        if(!noLastAction) {
                          Actions.lock(user.lastActionId, function(previousActionDone) {
                            locks.unshift(previousActionDone);
                            performAction(newActionId, user.lastActionId);
                          });
                        } else
                          performAction(newActionId, "-1");
                      });
                    });
                  });
                  break;
                case "UNDO":
                  try {
                    //get users last action
                    var lastActionId = user.lastActionId;
                    if(lastActionId === "-1")
                      throw new Error("No last action found (userId: "+userId+")!");
                    //lock action
                    Actions.lock(lastActionId, function(actionDone) {
                      //save unlock callback
                      locks.unshift(actionDone);
                      //read action
                      Actions.get(connection, lastActionId, function(err, lastAction) {
                        //handle error
                        if(err) { fail(err); return; }
                        try {
                          //if action.undone==true then abort, error
                          if(lastAction.undone)
                            throw new Error("Last action is already undone. Debug please (userId="+userId+", actionId="+lastActionId+").");
                          //lock tiles
                          Tiles.lock(lastAction.region, function(tilesDone) {
                            //save unlock callback
                            locks.unshift(tilesDone);

                            //start transaction
                            var transaction = connection.startTransaction();
                            function rollback(err) {
                              transaction.rollback();
                              fail(err);
                            }
                            function commit(rslt) {
                              transaction.commit(function(err, info) {
                                if(err) {
                                  fail(err);
                                } else {
                                  success(rslt);
                                  broadcastAction(lastActionId, action, userId, lastAction.region);
                                }
                              });
                            }
                            //TODO commit jobs
                            Actions.setUndone(transaction, lastActionId, true, function(err) {
                              if(err) { rollback(err); return; }
                              Users.setLastActionId(transaction, userId, lastAction.previousActionId, function(err) {
                                if(err) { rollback(err); return; }
                                Tiles.toggleAction(transaction, lastAction.region, lastActionId, false, function(err) {
                                  if(err) { rollback(err); return; }
                                  Users.incrementUsageStatistics(transaction, userId, action.type, function(err) {
                                    if(err) { rollback(err); return; }
                                    commit(lastActionId);
                                  });
                                });
                              });
                            });
                            transaction.execute();
                          });
                        } catch(ex) { fail(ex); }
                      });
                    });
                  } catch(ex) { fail(ex); }
                  break;
                case "REDO":
                  function redoAction(actionId) {
                    Actions.lock(actionId, function(actionDone) {
                      //save unlock callback
                      locks.unshift(actionDone);
                      //read action
                      Actions.get(connection, actionId, function(err, nextAction) {
                        if(err) { fail(err); return; }
                        try {
                          if(!nextAction.undone)
                            throw new Error("Cannot redo action (userId: "+userId+"; actionId: "+actionId+").");

                          //start transaction
                          var transaction = connection.startTransaction();
                          function rollback(err) {
                            transaction.rollback();
                            fail(err);
                          }
                          function commit() {
                            transaction.commit(function(err, info) {
                              if(err) {
                                fail(err);
                              } else {
                                success(actionId);
                                broadcastAction(actionId, action, userId, nextAction.region);
                              }
                            });
                          }
                          //TODO commit jobs
                          Actions.setUndone(transaction, actionId, false, function(err) {
                            if(err) { rollback(err); return; }
                            Users.setLastActionId(transaction, userId, actionId, function(err) {
                              if(err) { rollback(err); return; }
                              Tiles.toggleAction(transaction, nextAction.region, actionId, true, function(err) {
                                if(err) { rollback(err); return; }
                                Users.incrementUsageStatistics(transaction, userId, action.type, function(err) {
                                  if(err) { rollback(err); return; }
                                  commit();
                                });
                              });
                            });
                          });
                          transaction.execute();
                        } catch(ex) { fail(ex); }
                      });
                    });
                  }
                  try {
                    //get users last action
                    var lastActionId = user.lastActionId;
                    //if there is no last action, check first action (next candidate for redoing)
                    if(lastActionId === "-1") {
                      var firstActionId = user.firstActionId;
                      if(firstActionId === "-1")
                        throw new Error("No redoable action found (userId: "+userId+")!");
                      redoAction(firstActionId);
                    } else {
                      //lock action
                      Actions.lock(lastActionId, function(actionDone) {
                        //save unlock callback
                        locks.unshift(actionDone);
                        //read action
                        Actions.get(connection, lastActionId, function(err, lastAction) {
                          //handle error
                          if(err) { fail(err); return; }
                          try {
                            var nextActionId = lastAction.nextActionId;
                            if(nextActionId === "-1")
                              throw new Error("No next action found (userId: "+userId+"; actionId: "+lastActionId+").");
                            redoAction(nextActionId);
                          } catch(ex) { fail(ex); }
                        });
                      });
                    }
                  } catch(ex) { fail(ex); }
                  break;
              }
            });
          });
        });
      });
    },
    getName: function(socket, userId, callback) {
      console.log("get name...");
      callback(null, "username");
    },
    setName: function(socket, name, callback) {
      console.log("set name of user "+socket.getUserId()+" to '"+name+"'.");
      callback();
    },
    defineImage: function(socket, x, y, width, height, callback) {
      console.log("set name of user "+socket.getUserId()+" to '"+name+"'.");
      callback(null, "123");
    }
  });
};

module.exports = {
  BigCanvasSocket: BigCanvasSocket,
  BigCanvas: BigCanvas
};
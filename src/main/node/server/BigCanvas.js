var Config = require("./Config");

var lock = require("./lock");

var BigInteger = require("big-integer");
var Types = require("./ServerTypes");
var Point = Types.Point;
var BoundingBox = Types.BoundingBox;
var Window = Types.Window;
var WindowTree = Types.WindowTree;

var BigCanvasDefinitions = require("./BigCanvasDefinitions");
var _ = require("underscore");

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
    var lockKey = "locks/canvas";
    lock(lockKey, callback);
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
      var locks = [],
          userId = socket.getUserId();
      function unlock() {
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

      success("-1");
      return;

      switch(action.type) {
        case "BRUSH":
        case "ERASER":
          /*//check if stroke <= BoundingBox(4096x4096)
          var maxSize = Config.ACTION_MAX_STROKE_SIZE,
              width = BigInteger(action.width),
              opacity = parseFloat(action.opacity),
              bb = new BoundingBox(),
              stroke = _.map(action.stroke, function(point) {
                return new Point(point.x, point.y);
              });
          _.each(stroke, function(point) { bb.addPoint(point); });
          bb.extend(Math.ceil(width / 2));
          if(bb.getWidth().greater(maxSize)
             || bb.getHeight().greater(maxSize)) {
            callback(new Error("The stroke was too big."));
            return;
          }

          function performAction(newActionId, previousActionId) {
            Actions.addNew(newActionId, action, userId, previousActionId, function(err) {
              if(err) { fail(err); return; }
              //create and save deltas
              Jobs.createDeltas(newActionId, action, function(err, region) {
                if(err) { fail(err); return; }
                //set region of new action
                Actions.setRegion(newActionId, region, function(err) {
                  if(err) { fail(err); return; }
                  //update tiles
                  Tiles.addActionBatch(region, newActionId, function(err) {
                    if(err) { fail(err); return; }
                    //write previous action (prevAction.next)
                    Actions.setNextActionId(previousActionId, newActionId, function(err) {
                      if(err) { fail(err); return; }
                      //write user.lastAction
                      Users.setLastActionId(userId, newActionId, function(err) {
                        if(err) { fail(err); return; }
                        //(re-)create n render jobs
                        Jobs.commit(region, newActionId, true, function(err) {
                          if(err) { fail(err); return; }
                          success(newActionId);
                        });
                      });
                    });
                  })
                });
              });
            });
          }

          //lock canvas
          lockCanvas(function(canvasDone) {
            locks.unshift(canvasDone);
            //get new action id
            Actions.generateId(function(err, newActionId) {
              if(err) { fail(err); return; }
              //lock user
              Users.lock(userId, function(userDone) {
                locks.unshift(userDone);
                //read user.lastAction
                Users.get(userId, function(err, user) {
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
            });
          });  */
          break;
        case "UNDO":
          /*//lock user
          Users.lock(userId, function(userDone) {
            //save unlock callback
            locks.unshift(userDone);
            //get user
            Users.get(userId, function(err, user) {
              //handle error
              if(err) { fail(err); return; }
              try {
                //get users last action
                var lastActionId = user.lastActionId || "-1";
                if(lastActionId === "-1")
                  throw new Error("No last action found (userId: "+userId+")!");
                //lock action
                Actions.lock(lastActionId, function(actionDone) {
                  //save unlock callback
                  locks.unshift(actionDone);
                  //read action
                  Actions.get(lastActionId, function(err, lastAction) {
                    //handle error
                    if(err) { fail(err); return; }
                    try {
                      //if action.undone==true then abort, error
                      if(lastAction.undone)
                        throw new Error("Last action is already undone (userId: "+userId+"; actionId: "+lastActionId+").");
                      //write action (undone=true)
                      Actions.setUndone(lastActionId, true, function(err) {
                        //handle error
                        if(err) { fail(err); return; }
                        //write user
                        Users.setLastActionId(userId, action.previousActionId, function(err) {
                          //handle error
                          if(err) { fail(err); return; }
                          //commit jobs
                          Jobs.commit(lastAction.region, lastActionId, false, function(err) {
                            //handle error
                            if(err) { fail(err); return; }
                            console.log("UNDO was successfully performed (userId: "+userId+")");
                            success("-1");
                          });
                        });
                      });
                    } catch(ex) { fail(ex); }
                  });
                });
              } catch(ex) { fail(ex); }
            });
          });*/
          break;
        case "REDO":
          /*function redoAction(actionId) {
            Actions.lock(actionId, function(actionDone) {
              //save unlock callback
              locks.unshift(actionDone);
              //read action
              Actions.get(actionId, function(err, action) {
                //handle error
                if(err) { fail(err); return; }
                try {
                  if(!action.undone)
                    throw new Error("Cannot redo action (userId: "+userId+"; actionId: "+actionId+").");
                  //write action (undone=true)
                  Actions.setUndone(actionId, false, function(err) {
                    //handle error
                    if(err) { fail(err); return; }
                    //write user
                    Users.setLastActionId(userId, actionId, function(err) {
                      //handle error
                      if(err) { fail(err); return; }
                      //commit jobs
                      Jobs.commit(action.region, actionId, true, function(err) {
                        //handle error
                        if(err) { fail(err); return; }
                        console.log("REDO was successfully performed (userId: "+userId+")");
                        success("-1");
                      });
                    });
                  });
                } catch(ex) { fail(ex); }
              });
            });
          }
          //lock user
          Users.lock(userId, function(userDone) {
            //save unlock callback
            locks.unshift(userDone);
            //get user
            Users.get(userId, function(err, user) {
              //handle error
              if(err) { fail(err); return; }
              try {
                //get users last action
                var lastActionId = user.lastActionId || "-1";
                //if there is no last action, check first action (next candidate for redoing)
                if(lastActionId === "-1") {
                  var firstActionId = user.firstActionId || "-1";
                  if(firstActionId === "-1")
                    throw new Error("No redoable action found (userId: "+userId+")!");
                  redoAction(firstActionId);
                } else {
                  //lock action
                  Actions.lock(lastActionId, function(actionDone) {
                    //save unlock callback
                    locks.unshift(actionDone);
                    //read action
                    Actions.get(lastActionId, function(err, lastAction) {
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
            });
          });*/
          break;
      }
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
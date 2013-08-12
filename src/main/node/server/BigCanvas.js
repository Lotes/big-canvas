var redis = require("redis");
var client = redis.createClient();
var lock = require("redis-lock")(client);
var Config = require("./Config");
var BigInteger = require("big-integer");
var Types = require("./ServerTypes");
var Point = Types.Point;
var BoundingBox = Types.BoundingBox;
var Window = Types.Window;
var WindowTree = Types.WindowTree;
var BigCanvasDefinitions = require("./BigCanvasDefinitions");
var Users = require("./data/Users");
var Actions = require("./data/Actions");
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
      console.log("performing "+action.type+" (userID: "+userId+")");
      switch(action.type) {
        case "BRUSH":
        case "ERASER":
          //check if stroke <= BoundingBox(4096x4096)
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
          //lock canvas
          //get new action id
          //lock user
          //read user.lastAction
          //lock action and previous action
          //write action (undone, stroke, width, color, opacity, userId, timestamp, previous, but no region!)
          //create canvas (MOD TILE_SIZE, keep position and tile location in mind)
          //draw stroke
          //determine affected region
          //write action (region)
          //split and save n images
          //write n deltas (tileLocation, actionId, path)
          //(re-)create n render jobs
          //write previous action (next)
          //write user.lastAction
          //unlock action and previous action
          //unlock user
          //unlock canvas
          break;
        case "UNDO":
          //lock user
          Users.lock(userId, function(userDone) {
            //save unlock callback
            locks.unshift(userDone);
            //get user
            Users.get(userId, function(err, user) {
              //handle error
              if(err) {
                callback(err);
                unlock();
                return;
              }
              try {
                //get users last action
                var lastActionId = user.lastActionId || "-1";
                if(lastActionId === "-1")
                  throw new Error("No last action found (userId: "+userId+")!");
                if(!generator.Types.ActionId.validate(lastActionId))
                  throw new Error("Last action id has bad format (userId: "+userId+").");
                //lock action
                Actions.lock(lastActionId, function(actionDone) {
                  //save unlock callback
                  locks.unshift(actionDone);
                  //read action
                  Actions.get(lastActionId, function(err, lastAction) {
                    //handle error
                    if(err) {
                      callback(err);
                      unlock();
                      return;
                    }
                    try {
                      //check type
                      if(!generator.Types.ActionData.validate(lastAction))
                        throw new Error("Last action has bad format (actionId: "+lastActionId+").");
                      //if action.undone==true then abort, error
                      if(lastAction.undone)
                        throw new Error("Last action is already undone (userId: "+userId+"; actionId: "+lastActionId+").");
                      //write action (undone=true)
                      Actions.setUndone(lastActionId, true, function(err) {
                        //handle error
                        if(err) {
                          callback(err);
                          unlock();
                          return;
                        }
                        //write user (lastAction=action.previous)
                        Users.setLastActionId(userId, action.previous, function(err) {
                          //handle error
                          if(err) {
                            callback(err);
                            unlock();
                            return;
                          }
                          //TODO
                          //foreach(location in action.region)
                          //  get index of actionId in tiles[location].actions
                          //  set bitStrings index-th entry to "0"
                          //  (re-)create a render job for location
                          console.log("UNDO was sucessfully performed (userId: "+userId+")");
                          callback(null, "-1");
                          unlock();
                        });
                      });
                    } catch(ex) {
                      callback(ex);
                      unlock();
                    }
                  });
                });
              } catch(ex) {
                callback(ex);
                unlock();
              }
            });
          });
          break;
        case "REDO":
          //lock user
          //read user.lastAction
          //lock lastAction
          //read lastAction.next
          //if next is undefined then abort, error
          //unlock lastAction
          //lock nextAction
          //read nextAction (undone)
          //if nextAction.undone==false then abort, error
          //write nextAction (undone=false)
          //write user (lastAction)
          //foreach(location in nextAction.region)
          //  get index of actionId in tiles[location].actions
          //  set bitStrings index-th entry to "1"
          //  (re-)create a render job for location
          //unlock nextAction
          //unlock user
          break;
      }
      callback(null, "-1"); //returns actionId
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
var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var definitionsText = require("../rpc/big-canvas");
var generator = new Generator(definitionsText);
var BigInteger = require("big-integer");
var Types = require("./ServerTypes");
var Point = Types.Point;
var BoundingBox = Types.BoundingBox;
var Window = Types.Window;
var WindowTree = Types.WindowTree;

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
  //setup server stub
  this.Server = new generator.Interfaces.Main.Server({
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
          //get users last action (read user[id].lastAction)
          //lock action
          //read action
          //if action.undone==true then abort, error
          //write action (undone=true)
          //write user (lastAction=action.previous)
          //foreach(location in action.region)
          //  get index of actionId in tiles[location].actions
          //  set bitStrings index-th entry to "0"
          //  (re-)create a render job for location
          //unlock action
          //unlock user
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
      console.log("send action...");
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
  BigCanvas: BigCanvas,
  BigCanvasTypes: generator.Types
};
var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var fs = require("fs");
var definitionsText = fs.readFileSync(Config.RPC_DEFINITIONS_PATH, { encoding: "utf8" });
var generator = new Generator(definitionsText);
var BigInteger = require("big-integer");
var Types = require("./ServerTypes");

var socketIds = BigInteger(0);
function BigCanvasSocket(wsSocket, userId) {
  var id = socketIds.toString();
  socketIds = socketIds.next();
  this.getId = function() { return id; };
  this.send = function(obj) { wsSocket.send(JSON.stringify(obj)); };
  this.getUserId = function() { return userId; };
  this.close = function(obj) { wsSocket.close(); };
}

var BigCanvas = function() {
  var self = this;
  self.sockets = {};
  //setup server stub
  self.Types = generator.Types;
  self.Server = new generator.Interfaces.Main.Server({
    connect: function(socket) {
      self.sockets[socket.getId()] = socket;
    },
    disconnect: function(socket) {
      delete self.sockets[socket.getId()];
    },
    //remote procedure call implementations
    setWindow: function(socket, x, y, width, height, callback) {
      console.log("set window...");
      callback();
    },
    sendAction: function(socket, action, callback) {
      console.log("send action...");
      callback(null, -1); //returns actionId
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
      callback();
    }
  });
};

module.exports = {
  BigCanvasSocket: BigCanvasSocket,
  BigCanvas: BigCanvas
};
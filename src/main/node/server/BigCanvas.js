var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var fs = require("fs");
var definitionsText = fs.readFileSync(Config.RPC_DEFINITIONS_PATH, { encoding: "utf8" });
var generator = new Generator(definitionsText);
var BigInteger = require("big-integer");

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
  //setup server stub
  this.Types = generator.Types;
  this.Server = new generator.Interfaces.Main.Server({
    constructor: function() {
      this.sockets = {};
    },
    connect: function(socket) {
      this.sockets[socket.getId()] = socket;
    },
    disconnect: function(socket) {
      delete this.sockets[socket.getId()];
    },
    //remote procedure call implementations
    setName: function(socket, name, callback) {
      console.log("set name of user "+socket.getUserId()+" to '"+name+"'.");
      callback();
    }
  });
};

module.exports = {
  BigCanvasSocket: BigCanvasSocket,
  BigCanvas: BigCanvas
};
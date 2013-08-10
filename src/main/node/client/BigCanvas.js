var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var rpcDefinition = require("./../rpc/big-canvas");
var BigCanvas = function() {
  var self = this;
  //setup client stub
  var generator = new Generator(rpcDefinition);
  var Types = generator.Types;
  var client = new generator.Interfaces.Main.Client({
    onAction: function(userId, actionId, action, region) {
      console.log(userId);
    },
    onWindowUpdated: function(updates) {

    }
  });

  //setup web socket
  var connected = false;
  var url = "ws://"+document.location.hostname+":"+Config.SERVER_SOCKET_PORT+"/"+Config.SERVER_SOCKET_PATH;
  var socket = new WebSocket(url);
  socket.onopen = function() {
    connected = true;
  };
  socket.onerror = function() {
    console.log("WebSocket error!");
  };
  socket.onclose = function() {
    connected = false;
    console.log("WebSocket closed!");
  };
  socket.onmessage = function(msg) {
    try {
      var obj = JSON.parse(msg.data);
      client.receive(obj);
    } catch(ex) {
      console.log("Could not read message: "+msg.data+" ("+ex.message+").");
    }
  };
  client.on("send", function(obj) {
    var msg = JSON.stringify(obj);
    if(connected)
      socket.send(msg);
    else
      console.log("Could not send message: "+msg+".");
  })

  //functions
  self.moveTo = function(center) {
    console.log("moving to (x: "+ center.x.toString()+"; y: "+center.y.toString()+")");
  };
  self.resize = function(width, height) {
    console.log("resizing to (width: "+ width+"; height: "+height+")");
  };
  self.setMode = function(mode) {
    console.log("set mode to "+mode);
  };
};
module.exports = BigCanvas;
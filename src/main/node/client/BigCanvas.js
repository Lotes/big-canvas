var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var BigCanvas = function(callback) {
  var self = this;
  $.ajax(Config.RPC_DEFINITIONS_PATH)
    .done(function(definitionsText) {
      //setup client stub
      var generator = new Generator(definitionsText);
      self.Types = generator.Types;
      self.Client = new generator.Interfaces.Main.Client({
        onAction: function(userId, actionId, action, region) {
          console.log(userId);
        },
        onUpdate: function(updates) {

        }
      });
      //setup web socket
      var connected = false;
      var url = "ws://"+document.location.hostname+":"+Config.SERVER_SOCKET_PORT+"/"+Config.SERVER_SOCKET_PATH;
      var socket = new WebSocket(url);
      socket.onopen = function() {
        connected = true;
        callback();
      };
      socket.onerror = function() {
        if(!connected)
          callback(new Error("Could not connect with web socket!"));
        console.log("WebSocket error!");
      };
      socket.onclose = function() {
        connected = false;
        console.log("WebSocket closed!");
      };
      socket.onmessage = function(msg) {
        try {
          var obj = JSON.parse(msg.data);
          self.Client.receive(obj);
        } catch(ex) {
          console.log("Could not read message: "+msg.data+" ("+ex.message+").");
        }
      };
      self.Client.on("send", function(obj) {
        var msg = JSON.stringify(obj);
        if(connected)
          socket.send(msg);
        else
          console.log("Could not send message: "+msg+".");
      })
    })
    .fail(function(jqXHR, textStatus) {
      callback(new Error(textStatus));
    });
};
module.exports = BigCanvas;
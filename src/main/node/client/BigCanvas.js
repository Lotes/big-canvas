var Types = require("../Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var rpcDefinition = require("./../rpc/big-canvas");
var BigCanvas = function(element) {
  var self = this;
  var $element = $(element);
  var center = new Point(0, 0);
  var mode = "MOVE";
  var width = 0;
  var height = 0;
  var cells = [];

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

  function rebuildTilesTable() {
    var columns = Math.floor(width / Config.TILE_SIZE) + 2, //TODO is +2 correct?
        rows = Math.floor(height / Config.TILE_SIZE) + 2,
        left = center.x.minus(Math.floor(width / 2)).mod(Config.TILE_SIZE),
        top = center.y.minus(Math.floor(height / 2)).mod(Config.TILE_SIZE);
    if(left.isNegative())
      left = left.add(Config.TILE_SIZE);
    if(top.isNegative())
      top = top.add(Config.TILE_SIZE);
    var table = document.createElement("table");
    $(table).attr("cellpadding", "0");
    $(table).attr("cellspacing", "0");
    $(table).attr("width", Config.TILE_SIZE * columns);
    $(table).attr("height", Config.TILE_SIZE * rows);
    $(table).css("position", "relative");
    $(table).css("left", "-"+left.toString()+"px");
    $(table).css("top", "-"+top.toString()+"px");
    cells = [];
    for(var r=0; r<rows; r++) {
      var row = document.createElement("tr");
      $(row).attr("height", Config.TILE_SIZE);
      var cellsRow = [];
      for(var c=0; c<columns; c++) {
        var cell = document.createElement("td");
        $(cell).attr("width", Config.TILE_SIZE);
        row.appendChild(cell);
        cellsRow.push(cell);
      }
      table.appendChild(row);
      cells.push(cellsRow);
    }

    //TODO erase this block
    for(var r=0; r<rows; r++) {
      for(var c=0; c<columns; c++) {
        if((c+r)%2==0)
          $(cells[r][c]).css("background-color", "blue");
      }
    }

    $element.html("");
    $element.append(table);
  }
  function updateWindow() {
    var x = center.x.minus(Math.floor(width/2)),
        y = center.y.minus(Math.floor(height/2));
    //update tiles
    rebuildTilesTable();

    //send window
    client.setWindow(x.toString(), y.toString(), width, height, function(err) {
      if(err)
        alert("Error while sending new window: "+err.message);
    });
  }
  self.moveTo = function(ctr) {
    center = ctr;
    console.log("moving to (x: "+ center.x.toString()+"; y: "+center.y.toString()+")");
    updateWindow();
  };
  self.resize = function() {
    width = $element.width();
    height = $element.height();
    console.log("resizing to (width: "+ width+"; height: "+height+")");
    updateWindow();
  };
  self.setMode = function(md) {
    console.log("set mode to "+md);
    mode = md;
    //TODO
  };
  self.undo = function() { console.log("UNDO"); };
  self.redo = function() { console.log("REDO"); };

  { //setup web socket
    var connected = false;
    var url = "ws://"+document.location.hostname+":"+Config.SERVER_SOCKET_PORT+"/"+Config.SERVER_SOCKET_PATH;
    var socket = new WebSocket(url);
    socket.onopen = function() {
      connected = true;
      self.resize();
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
    });
  }
};
module.exports = BigCanvas;
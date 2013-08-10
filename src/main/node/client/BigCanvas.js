var Types = require("../Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var rpcDefinition = require("./../rpc/big-canvas");
var BigInteger = require("big-integer");
var _ = require("underscore");
var Backbone = require("backbone");
var BigCanvas = function(element) {
  var self = this;
  _.extend(self, Backbone.Events);
  var $element = $(element);
  var center = new Point(0, 0);
  var Mode = {
    MOVE: "MOVE",
    BRUSH: "BRUSH",
    ERASER: "ERASER"
  };
  var mode = Mode.MOVE;
  var width = 0;
  var height = 0;
  var cells = [];
  var pressed = false;
  var oldPosition = null;
  var oldCenter = null;
  var line = null;
  var transparentPoster = document.createElement("canvas");

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

  //resizing and moving
  function rebuildTilesTable() {
    var columns = Math.floor(width / Config.TILE_SIZE) + 2, //TODO is +2 correct?
        rows = Math.floor(height / Config.TILE_SIZE) + 2,
        left = center.x.minus(Math.floor(width/2)).mod(Config.TILE_SIZE),
        top = center.y.minus(Math.floor(height/2)).mod(Config.TILE_SIZE);
    if(left.isNegative())
      left = left.plus(Config.TILE_SIZE);
    if(top.isNegative())
      top = top.plus(Config.TILE_SIZE);
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

    //setup transparent poster
    $(transparentPoster).css("position", "absolute");
    $(transparentPoster).css("left", "0px");
    $(transparentPoster).css("top", "0px");
    transparentPoster.width = width;
    transparentPoster.height = height;
    var g = transparentPoster.getContext("2d");
    var size = 8;
    for(var x=0; x<width/size; x++)
      for(var y=0; y<height/size; y++) {
        g.fillStyle = (x+y)%2==0 ? "white" : "gray";
        g.fillRect(x*size, y*size, size, size);
      }

    //TODO erase this block
    for(var r=0; r<rows; r++) {
      for(var c=0; c<columns; c++) {
        if((c+r)%2==0)
          $(cells[r][c]).css("background-color", "blue");
      }
    }

    $element.html("");
    $element.append(transparentPoster);
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
    updateWindow();
  };
  function resize() {
    width = $element.width();
    height = $element.height();
    updateWindow();
  };
  $(window).resize(function() { resize(); });

  //mouse events
  function stroke(from, to) {

  }
  function endStroke() {

  }

  function pageToCanvas(pageX, pageY) {
    //converts page coordinates to canvas coordinates
    var offset = $element.offset(),
        x = pageX - offset.left - Math.floor(width/2),
        y = pageY - offset.top - Math.floor(height/2),
        cx = BigInteger(x).add(center.x),
        cy = BigInteger(y).add(center.y);
    return new Point(cx, cy);
  }
  function touchBegin(pt) {
    pressed = true;
    oldPosition = pt;
    oldCenter = center;
    line = [];
  }
  function touchMove(pt) {
    switch(mode) {
      case Mode.BRUSH:
      case Mode.ERASER:
        stroke(oldPosition, pt);
        oldPosition = pt;
        break;
      case Mode.MOVE:
        self.moveTo(new Point(
          oldCenter.x.minus(pt.x.minus(oldPosition.x)),
          oldCenter.y.minus(pt.y.minus(oldPosition.y))
        ));
        break;
    }
  }
  function touchEnd(pt) {
    pressed = false;
    switch(mode) {
      case Mode.BRUSH:
      case Mode.ERASER:
        endStroke();
        break;
      case Mode.MOVE:
        self.trigger("move", center);
        break;
    }
  }

  $element.mousedown(function(event){
    if(event.which == 1) {//Left button
      var point = pageToCanvas(event.pageX, event.pageY);
      touchBegin(point);
    }
  });
  $element.mouseup(function(event){
    var point = pageToCanvas(event.pageX, event.pageY);
    touchEnd(point);
  });
  $element.mouseleave(function(event) {
    var point = pageToCanvas(event.pageX, event.pageY);
    touchEnd(point);
  });
  $element.mousemove(function(event){
    if(pressed)
    {
      var point = pageToCanvas(event.pageX, event.pageY);
      touchMove(point);
    }
  });

  //editor
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
      resize();
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
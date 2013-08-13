var Types = require("../Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var rpcDefinition = require("./../rpc/big-canvas");
var BigInteger = require("big-integer");
var _ = require("underscore");
var Backbone = require("backbone");

function BigCanvas(element) {
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
  var pressed = false;
  var width = 0;
  var height = 0;
  var cells = [];
  var oldPosition = null;
  var oldCenter = null;
  var transparentPoster = document.createElement("canvas");

  var line = null;
  var strokeWidth = 10;
  var strokeColor = "#FF00FF";
  var strokeOpacity = 0.5;

  var unacknowledgedCanvasStack = [];
  var currentUnacknowledgedCanvas = null;

  this.getColor = function() { return strokeColor; };
  this.setColor = function(color) { strokeColor = color; };

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
  function updatePosition(position, elem) {
    var $elem = $(elem),
      left = center.x.minus(Math.floor(width/2)),
      top = center.y.minus(Math.floor(height/2)),
      deltaX = position.x.minus(left),
      deltaY = position.y.minus(top);
    $elem.css("left", deltaX.toString()+"px");
    $elem.css("top", deltaY.toString()+"px");
  }
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
    var $table = $(table);
    $table.attr("cellpadding", "0");
    $table.attr("cellspacing", "0");
    $table.attr("width", Config.TILE_SIZE * columns);
    $table.attr("height", Config.TILE_SIZE * rows);
    $table.css("position", "relative");
    $table.css("left", "-"+left.toString()+"px");
    $table.css("top", "-"+top.toString()+"px");
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
    var size = Config.TRANSPARENT_POSTER_TILE_SIZE;
    for(var x=0; x<width/size; x++)
      for(var y=0; y<height/size; y++) {
        g.fillStyle = (x+y)%2==0 ? "white" : "gray";
        g.fillRect(x*size, y*size, size, size);
      }

    //fill the element with new content
    $element.html("");
    $element.append(transparentPoster);
    $element.append(table);
    _.each(unacknowledgedCanvasStack, function(uc) {
      updatePosition(uc.position, uc.canvas);
      $element.append(uc.canvas);
    });
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

  function UnacknowledgedCanvas() {
    var halfWidth = Math.ceil(width/2),
        halfHeight = Math.ceil(height/2),
        halfStrokeWidth = Math.ceil(strokeWidth/2),
        left = center.x.minus(halfWidth).minus(halfStrokeWidth),
        top = center.y.minus(halfHeight).minus(halfStrokeWidth),
        right = center.x.add(halfWidth).add(halfStrokeWidth),
        bottom = center.y.add(halfHeight).add(halfStrokeWidth),
        locLeftTop = new Point(left, top).toLocation(),
        locRightBottom = new Point(right, bottom).toLocation(),
        leftTop = locLeftTop.toPoint(),
        canvasWidth = locRightBottom.column.minus(locLeftTop.column).next().times(Config.TILE_SIZE).toJSNumber(),
        canvasHeight = locRightBottom.row.minus(locLeftTop.row).next().times(Config.TILE_SIZE).toJSNumber(),
        canvas = document.createElement("canvas"),
        $canvas = $(canvas);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    this.canvas = canvas;
    this.position = leftTop;
    this.location = locLeftTop;
    $canvas.css("position", "absolute");
    updatePosition(this.position, this.canvas);
    $element.append(canvas);
    unacknowledgedCanvasStack.push(this);
  }

  //stroke events
  function beginStroke(first) {
    currentUnacknowledgedCanvas = new UnacknowledgedCanvas();
    //edit line
    line = [first];
  }
  function doStroke(from, to) {
    //edit line
    var last = line[line.length-1];
    if(!last.equals(from))
      line.push(from);
    line.push(to);
    //draw line
    var leftTop = currentUnacknowledgedCanvas.position,
        relativeFrom = from.minus(leftTop),
        relativeTo = to.minus(leftTop),
        g = currentUnacknowledgedCanvas.canvas.getContext("2d");
    switch(mode) {
      case Mode.BRUSH:
        g.globalAlpha = strokeOpacity;
        g.globalCompositeOperation = "xor";
        g.strokeStyle = strokeColor;
        g.lineWidth = strokeWidth;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(relativeFrom.x.toJSNumber(), relativeFrom.y.toJSNumber());
        g.lineTo(relativeTo.x.toJSNumber(), relativeTo.y.toJSNumber());
        g.stroke();
        break;
      case Mode.ERASER:
        var bb = new BoundingBox();
        bb.addPoint(from);
        bb.addPoint(to);
        bb.extend(Math.ceil(strokeWidth/2));
        var bbRelPosition = bb.getMin().minus(leftTop);
        var bbWidth = bb.getWidth().toJSNumber();
        var bbHeight = bb.getHeight().toJSNumber();
        var bbX = bbRelPosition.x.toJSNumber();
        var bbY = bbRelPosition.y.toJSNumber()

        g.globalAlpha = strokeOpacity;
        g.globalCompositeOperation = "xor";
        g.strokeStyle = "#FFFFFF";
        g.lineWidth = strokeWidth;
        g.lineCap = "round";
        g.beginPath();
        g.moveTo(relativeFrom.x.toJSNumber(), relativeFrom.y.toJSNumber());
        g.lineTo(relativeTo.x.toJSNumber(), relativeTo.y.toJSNumber());
        g.stroke();

        var size = Config.TRANSPARENT_POSTER_TILE_SIZE;
        var imageData = g.getImageData(bbX, bbY, bbWidth, bbHeight);
        var data = imageData.data;
        for(var w=0; w<bbWidth; w++) {
          var x = bbX + w;
          var col = Math.floor(x / size);
          for(var h=0; h<bbHeight; h++) {
            var y = bbY + h;
            var row = Math.floor(y / size);
            var dataIndex = 4*(h * bbWidth + w);
            var color = (row+col)%2==0 ? Config.TRANSPARENT_POSTER_COLOR2 : Config.TRANSPARENT_POSTER_COLOR1;
            for(var i=0; i<3; i++)
              data[dataIndex+i] = color[i];
          }
        }
        g.putImageData(imageData, bbX, bbY);
        break;
    }
  }
  function endStroke(last) {
    //edit line
    if(line.length == 1)
      line.push(last);
    //send line
    var action = null;
    switch(mode) {
      case Mode.BRUSH:
        action = {
          type: "BRUSH",
          color: strokeColor,
          width: strokeWidth,
          opacity: strokeOpacity
        };
        break;
      case Mode.ERASER:
        action = {
          type: "ERASER",
          width: strokeWidth,
          opacity: strokeOpacity
        };
        break;
    }
    action.stroke = _.map(line, function(point) { return point.toData(); });
    client.sendAction(action, function(err, actionId) {
      //console.log(err);
      console.log("action acknowledged");
    });
  }

  //intermediate touch events
  function touchBegin(pt) {
    pressed = true;
    oldPosition = pt;
    switch(mode) {
      case Mode.BRUSH:
      case Mode.ERASER:
        beginStroke(pt);
        break;
      case Mode.MOVE:
        oldCenter = center;
        break;
    }
  }
  function touchMove(pt) {
    if(pressed)
      switch(mode) {
        case Mode.BRUSH:
        case Mode.ERASER:
          doStroke(oldPosition, pt);
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
    if(pressed) {
      pressed = false;
      switch(mode) {
        case Mode.BRUSH:
        case Mode.ERASER:
          endStroke(pt);
          break;
        case Mode.MOVE:
          self.trigger("move", center);
          break;
      }
    }
  }

  //converts page coordinates to canvas coordinates
  function pageToCanvas(pageX, pageY) {
    var offset = $element.offset(),
      x = pageX - offset.left - Math.floor(width/2),
      y = pageY - offset.top - Math.floor(height/2),
      cx = BigInteger(x).add(center.x),
      cy = BigInteger(y).add(center.y);
    return new Point(cx, cy);
  }

  //mouse events
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
    var point = pageToCanvas(event.pageX, event.pageY);
    touchMove(point);
  });

  //editor
  self.setMode = function(md) {
    console.log("set editor mode to '"+md+"'");
    mode = md;
    pressed = false;
  };
  self.undo = function() {
    var action = {
      type: "UNDO"
    };
    client.sendAction(action, function(err, actionId) {
      if(err)
        console.log(err);
      else
        console.log(actionId);
    });
  };
  self.redo = function() {
    var action = {
      type: "REDO"
    };
    client.sendAction(action, function(err, actionId) {
      if(err)
        console.log(err);
      else
        console.log(actionId);
    });
  };

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
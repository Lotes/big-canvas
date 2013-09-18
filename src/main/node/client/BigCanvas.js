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
var generator = new Generator(rpcDefinition);
var BigCanvasTypes = generator.Types;

function setUnselectable($element) {
  $element.css("-moz-user-select", "none");
  $element.css("-webkit-user-select", "none");
  $element.css("-ms-user-select", "none");
  $element.css("user-select", "none");
  $element.attr("unselectable", "on");
  $element.attr("onselectstart", "return false;");
  $element.attr("onmousedown", "return false;");
}

function BigCanvas(element) {
  var self = this,
    $element = $(element),
    center = new Point(0, 0),
    width = $element.width(),
    height = $element.height(),
    Mode = {
      MOVE: "MOVE",
      BRUSH: "BRUSH",
      ERASER: "ERASER"
    },

    mode = Mode.MOVE,
    line = null,
    strokeWidth = 10,
    strokeColor = "#FF00FF",
    strokeOpacity = 0.5,

    currentTempLayer = null;

  _.extend(self, Backbone.Events);

  self.getColor = function() { return strokeColor; };
  self.setColor = function(color) { strokeColor = color; };

  function TileWindow() {
    var left = center.x.minus(Math.floor(width/2)),
      top = center.y.minus(Math.floor(height/2)),
      right = left.add(width).prev(),
      bottom = top.add(height).prev(),
      min = new Point(left, top).toLocation(),
      max = new Point(right, bottom).toLocation(),
      leftTop = new Point(left, top);
    this.getMin = function() { return min; };
    this.getMax = function() { return max; };
    this.getWidth = function() { return max.column.minus(min.column).next().times(Config.TILE_SIZE).toJSNumber(); };
    this.getHeight = function() { return max.row.minus(min.row).next().times(Config.TILE_SIZE).toJSNumber(); };
    this.getPosition = function() { return leftTop; };
    this.equals = function(other) {
      return min.equals(other.getMin()) && max.equals(other.getMax());
    };
  }

  function BackgroundLayer() {
    var canvas = document.createElement("canvas"),
      $canvas = $(canvas),
      g = canvas.getContext("2d"),
      color = null;
    $canvas.css("position", "absolute");
    $canvas.css("left", "0px");
    $canvas.css("top", "0px");
    setUnselectable($canvas);
    this.refresh = function() {
      canvas.width = width;
      canvas.height = height;
      if(color == null) {
        var size = Config.TRANSPARENT_POSTER_TILE_SIZE;
        for(var x=0; x<width/size; x++)
          for(var y=0; y<height/size; y++) {
            g.fillStyle = (x+y)%2==0 ? "white" : "gray";
            g.fillRect(x*size, y*size, size, size);
          }
      } else {
        g.fillStyle = color;
        g.fillRect(0, 0, width, height);
      }
    };
    this.setColor = function(value) {
      color = value;
      this.refresh();
    };
    this.refresh();
    $element.append(canvas);
  }

  function GridLayer() {
    var table = document.createElement("table"),
      $table = $(table),
      entries = {},
      window = null,
      tempLayers = [];

    $table.attr("cellpadding", "0");
    $table.attr("cellspacing", "0");
    $table.css("position", "absolute");
    setUnselectable($table);

    function TemporaryLayer() {
      var window = new TileWindow(),
        canvas = document.createElement("canvas"),
        $canvas = $(canvas);

      tempLayers.push(this);

      canvas.width = window.getWidth();
      canvas.height = window.getHeight();
      $canvas.css("position", "absolute");

      function updateOffset() {
        var position = window.getPosition(),
            left = center.x.minus(Math.floor(width/2)),
            top = center.y.minus(Math.floor(height/2)),
            deltaX = position.x.minus(left),
            deltaY = position.y.minus(top);
        $canvas.css("left", deltaX.toString()+"px");
        $canvas.css("top", deltaY.toString()+"px");
      }

      this.getCanvas = function() { return canvas; };
      this.remove = function() {
        $canvas.remove();
        tempLayers = _.without(tempLayers, this);
      };
      this.refresh = function() { updateOffset(); };
      this.getPosition = function() { return window.getPosition(); };
      $element.append($canvas); //TODO add a grid div, add layers and table to the div
      updateOffset();
    }

    function Entry(location, $cell) {
      var statusText = null,
        statusCanvas = document.createElement("canvas"),
        busyImage = new Image(),
        $busyImage = $(busyImage),
        $statusCanvas = $(statusCanvas),
        canvas = null,
        size = Config.TILE_SIZE;
      busyImage.src = "images/loading.gif";
      statusCanvas.width = size;
      statusCanvas.height = size;
      $busyImage.css("position", "absolute");
      $busyImage.css("left", "0px");
      $busyImage.css("top", "0px");
      $statusCanvas.css("position", "absolute");
      $statusCanvas.css("left", "0px");
      $statusCanvas.css("top", "0px");
      function renderStatus() {
        var g = statusCanvas.getContext("2d");
        g.clearRect(0, 0, size, size);
        if(statusText != null) {
          g.fillStyle = "red";
          g.font = "bold 16px Arial";
          g.textAlign = "center";
          g.fillText(statusText, size/2, size/2);
        }
      }
      function refresh() {
        $cell.html("");
        if(canvas != null)
          $cell.append(canvas);
        if(statusText != null) {
          $cell.append(busyImage);
          $cell.append(statusCanvas);
        }
      }
      this.setStatus = function(status) {
        statusText = status;
        renderStatus();
        refresh();
      };
      this.setCanvas = function(c) {
        canvas = c;
        var $canvas = $(canvas);
        $canvas.css("position", "absolute");
        $canvas.css("left", "0px");
        $canvas.css("top", "0px");
        refresh();
      };
      this.setCell = function($c) {
        $cell = $c;
        refresh();
      };
    }

    function addEntry(collection, location, entry) {
      if(!(location.column in collection))
        collection[location.column] = {};
      collection[location.column][location.row] = entry;
    }

    function getEntry(location) {
      if(!(location.column in entries))
        return null;
      if(!(location.row in entries[location.column]))
        return null;
      return entries[location.column][location.row];
    }

    function rebuild() {
      var min = window.getMin(),
        max = window.getMax(),
        columnCount = max.column.minus(min.column).next().toJSNumber(),
        rowCount = max.row.minus(min.row).next().toJSNumber(),
        newEntries = {},
        size = Config.TILE_SIZE;
      $table.attr("width", size * columnCount);
      $table.attr("height", size * rowCount);
      $table.html("");
      for(var r=0; r<rowCount; r++) {
        var row = document.createElement("tr"),
          $row = $(row);
        $row.attr("height", size);
        setUnselectable($row);
        for(var c=0; c<columnCount; c++) {
          //setup cell
          var cell = document.createElement("td"),
            div = document.createElement("div"),
            $cell = $(cell),
            $div = $(div),
            location = new TileLocation(min.column.add(c), min.row.add(r)).toData();
          $cell.attr("width", size);
          $div.css("position", "relative");
          $div.css("width", size+"px");
          $div.css("height", size+"px");
          $cell.append(div);
          setUnselectable($cell);
          setUnselectable($div);
          row.appendChild(cell);

          //update entries
          var entry = getEntry(location);
          if(entry != null) {
            entry.setCell($div);
            addEntry(newEntries, location, entry);
          } else
            addEntry(newEntries, location, new Entry(location, $div));

          if(min.column.add(c+r).add(min.row).mod(2).equals(BigInteger.zero)) {
            //TODO erase
            //$cell.css("border", "2px blue dotted");
            $cell.css("background-color", "blue");
          }
        }
        table.appendChild(row);
      }
      entries = newEntries;
    }

    this.setTileStatus = function(location, status) {
      var entry = getEntry(location);
      if(entry != null)
        entry.setStatus(status);
    };
    this.setTileCanvas = function(location, canvas) {
      var entry = getEntry(location);
      if(entry != null)
        entry.setCanvas(canvas);
    };
    this.refresh = function() {
      var newWindow = new TileWindow();
      if(window == null || !window.equals(newWindow)) {
        window = newWindow;
        rebuild();
      } else
        window = newWindow;
      var size = BigInteger(Config.TILE_SIZE),
        position = window.getPosition(),
        deltaLeft = position.x.mod(size).mod(size), //double-mod: big-integer module doesn't work correct
        deltaTop = position.y.mod(size).mod(size);
      if(deltaLeft.isNegative())
        deltaLeft = deltaLeft.plus(size);
      if(deltaTop.isNegative())
        deltaTop = deltaTop.plus(size);
      $table.css("left", "-"+deltaLeft.toString()+"px");
      $table.css("top", "-"+deltaTop.toString()+"px");
      _.each(tempLayers, function(tmp) { tmp.refresh(); });
    };
    this.refresh();
    $element.append(table);
    this.addTempLayer = function() {
      return new TemporaryLayer();
    };
  }

  var background = new BackgroundLayer(),
      grid = new GridLayer();

  grid.setTileStatus({
    column: "0",
    row: "0"
  }, "center");

  function refresh() {
    background.refresh();
    grid.refresh();
  }

  var client = new generator.Interfaces.Main.Client({
    onUpdate: function(updates) {
      console.log(updates);
      //TODO
    }
  });

  function updateWindow() {
    var x = center.x.minus(Math.floor(width/2)),
        y = center.y.minus(Math.floor(height/2));
    refresh();
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
  }
  $(window).resize(function() { resize(); });

  { //mouse interaction section
    var pressed = false,
      oldPosition = null,
      oldCenter = null;

    function pageToClient(pageX, pageY) {
      var offset = $element.offset(),
        x = pageX - offset.left - Math.floor(width/2),
        y = pageY - offset.top - Math.floor(height/2);
      return new Point(x, y);
    }
    function clientToCanvas(point) {
      var cx = point.x.add(center.x),
          cy = point.y.add(center.y);
      return new Point(cx, cy);
    }

    //stroke events
    function beginStroke(first) {
      currentTempLayer = grid.addTempLayer();
      //edit line
      var point = clientToCanvas(first);
      line = [point];
    }
    function doStroke(a, b) {
      var from = clientToCanvas(a),
          to = clientToCanvas(b);
      //edit line
      var last = line[line.length-1];
      if(!last.equals(from))
        line.push(from);
      line.push(to);
      //draw line
      var leftTop = currentTempLayer.getPosition(),
        relativeFrom = from.minus(leftTop),
        relativeTo = to.minus(leftTop),
        g = currentTempLayer.getCanvas().getContext("2d");
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
    function endStroke(a) {
      var last = clientToCanvas(a);
      //edit line
      if(line.length == 1)
        doStroke(line[0], last);
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
        if(err) console.log(err.message);
        else console.log("action acknowledged: "+actionId);
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
      if(pressed) {
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

    //mouse events
    $element.mousedown(function(event){
      if(event.which == 1) {//Left button
        var point = pageToClient(event.pageX, event.pageY);
        touchBegin(point);
      }
    });
    $element.mouseup(function(event){
      var point = pageToClient(event.pageX, event.pageY);
      touchEnd(point);
    });
    $element.mouseleave(function(event) {
      var point = pageToClient(event.pageX, event.pageY);
      touchEnd(point);
    });
    $element.mousemove(function(event){
      var point = pageToClient(event.pageX, event.pageY);
      touchMove(point);
    });
  }

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
}

module.exports = BigCanvas;
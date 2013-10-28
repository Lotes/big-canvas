var Types = require("../Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var Config = require("./Config");
var BigInteger = require("big-integer");
var _ = require("underscore");
var Backbone = require("backbone");
var generator = require("../rpc/BigCanvasDefinitions");
var BigCanvasTypes = generator.Types;
var ActionTable = require("./ActionTable");
var TileHistory = require("./TileHistory");
var Cache = require("../Cache");

var ClientStrategies = require("./ClientStrategies");
var strategies = new ClientStrategies();
var Deltas = require("../Deltas");

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
    actions = new ActionTable(),
    pendingActionLayers = {},
    deltas = new Deltas(strategies),
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
    strokeOpacity = 1,

    currentTempLayer = null;

  $element.css("background", "url('images/transparent.png') repeat scroll 0 0 rgba(0,0,0,0)");

  _.extend(self, Backbone.Events);

  self.getColor = function() { return strokeColor; };
  self.setColor = function(color) { strokeColor = color; };

  self.getOpacity = function() { return strokeOpacity; };
  self.setOpacity = function(opacity) { strokeOpacity = opacity; };

  self.getStrokeWidth = function() { return strokeWidth; };
  self.setStrokeWidth = function(width) { strokeWidth = width; };

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
      var
        self = this,
        statusText = null,
        statusCanvas = document.createElement("canvas"),
        busyImage = new Image(),
        $busyImage = $(busyImage),
        $statusCanvas = $(statusCanvas),
        canvas = null,
        size = Config.TILE_SIZE,
        history = new TileHistory(),
        timeout = null,
        canvasCache = new Cache(20);
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
      function setCanvas(c) {
        canvas = c;
        var $canvas = $(canvas);
        $canvas.css("position", "absolute");
        $canvas.css("left", "0px");
        $canvas.css("top", "0px");
      }
      function setStatus(status) {
        statusText = status;
        renderStatus();
      }
      function renderLoop() {
        timeout = null;
        var revision = history.getHead();
        if(revision.isEmpty()) {
          canvas = null;
          statusText = null;
          refresh();
        } else {
          //get last cached canvas in tile history or the first one without action id (because this one is definitely available)
          var base = revision,
              next = null,
              operationsLeft = 0,
              cachedCanvas = null;
          while(
            (cachedCanvas = canvasCache.get(base.getId())) == null
            && base.getParent() != null
            && base.getActionId() != null
          ) {
            next = base;
            base = base.getParent();
            operationsLeft++;
          }

          function drawNext(baseCanvas, nextRevision) {
            //show old status
            setStatus(operationsLeft > 0 ? operationsLeft : null);
            refresh();
            if(nextRevision != null)
            {
              //initialize new canvas
              var newCanvas = document.createElement("canvas"),
                g = newCanvas.getContext("2d");
              newCanvas.width = size;
              newCanvas.height = size;
              g.clearRect(0, 0, size, size);
              g.drawImage(baseCanvas, 0, 0);

              //get action
              var actionId = nextRevision.getActionId();
              var action = actions.get(actionId).getAction();

              //get delta
              deltas.get(actionId, action, function(err, delta) {
                if(err) { console.log(err); return; } //TODO find better exception handling
                //apply delta
                var deltaTileCanvas = delta.getTile(location);
                deltas.apply(newCanvas, deltaTileCanvas, action, function(err, resultCanvas) {
                  if(err) { console.log(err); return; } //TODO find better exception handling
                  //update cell canvas
                  canvasCache.set(nextRevision.getId(), resultCanvas);
                  setCanvas(resultCanvas);
                  //show new status
                  operationsLeft--;
                  setStatus(operationsLeft > 0 ? operationsLeft : null);
                  refresh();
                  //trigger next render step
                  if(operationsLeft > 0)
                    self.render();
                });
              });
            }
          }

          //check if canvas was cached
          if(cachedCanvas == null) {
            var newCanvas = document.createElement("canvas"),
                g = newCanvas.getContext("2d");
            newCanvas.width = size;
            newCanvas.height = size;
            g.clearRect(0, 0, size, size);
            if(base.isEmpty()) {
              canvasCache.set(base.getId(), newCanvas);
              setCanvas(newCanvas);
              refresh();
              drawNext(newCanvas, next);
            } else {
              var baseImage = new Image();
              baseImage.onload = function() {
                canvasCache.set(base.getId(), newCanvas);
                g.drawImage(baseImage, 0, 0);
                setCanvas(newCanvas);
                refresh();
                drawNext(newCanvas, next);
              };
              baseImage.onerror = function() {
                //TODO
                console.log("Could not load revision image for (col: "+location.column+"; row: "+location.row+"; rev: "+base.getId()+")");
                //self.render(); //TODO is this a good idea? :-/
              };
              baseImage.src = "tiles/col"+location.column+"/row"+location.row+"/rev"+base.getId();
            }
          } else {
            setCanvas(cachedCanvas);
            drawNext(cachedCanvas, next);
          }
        }
      }
      this.getHistory = function() {
        return history;
      };
      this.render = function() {
        if(timeout == null)
          timeout = setTimeout(renderLoop, 0);
      };
      this.setElement = function($c) {
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
            entry.setElement($div);
            addEntry(newEntries, location, entry);
          } else
            addEntry(newEntries, location, new Entry(location, $div));

          /*if(min.column.add(c+r).add(min.row).mod(2).equals(BigInteger.zero)) {
            //TODO erase
            //$cell.css("border", "2px blue dotted");
            $cell.css("background-color", "blue");
          } */
        }
        table.appendChild(row);
      }
      entries = newEntries;
    }

    this.getCell = function(location) {
      return getEntry(location);
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

  var grid = new GridLayer();

  function refresh() {
    grid.refresh();
  }

  var client = new generator.Interfaces.Main.Client({
    onUpdate: function(updates) {
      _.each(updates, function(update) {
        var cell;
        switch(update.type) {
          case "ACTION":
            actions.add(update);
            var actionId = update.actionId;
            if(actionId in pendingActionLayers) {
              pendingActionLayers[actionId].remove();
              delete pendingActionLayers[actionId];
            }
            break;
          case "HISTORY":
            cell = grid.getCell(update.location);
            if(cell != null) {
              cell.getHistory().addNewBranch(update);
              cell.render();
            }
            break;
          case "RENDERED":
            cell = grid.getCell(update.location);
            if(cell != null) {
              var history = cell.getHistory();
              var revision = history.addRevision(update.revisionId);
              revision.setAvailable(true);
            }
            break;
        }
      });
    }
  });

  function updateWindow() {
    var x = center.x.minus(Math.floor(width/2)),
        y = center.y.minus(Math.floor(height/2));
    refresh();
    //send window
    client.setWindow(x.toString(), y.toString(), width, height, function(err) {
      if(err)
        console.log("Error while sending new window: "+err.message);
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
      line = [first];
    }
    function doStroke(from, to) {
      //edit line
      var last = line[line.length-1];
      if(!last.equals(from))
        line.push(from);
      line.push(to);
      //draw line
      var leftTop = currentTempLayer.getPosition(),
        canvas = currentTempLayer.getCanvas(),
        width = canvas.width,
        height = canvas.height,
        g = canvas.getContext("2d");
      switch(mode) {
        case Mode.BRUSH:
          g.clearRect(0, 0, width, height);
          g.globalAlpha = strokeOpacity;
          g.globalCompositeOperation = "none";
          g.strokeStyle = strokeColor;
          g.lineWidth = strokeWidth;
          g.lineCap = "round";
          g.lineJoin = "round";
          g.beginPath();
          _.each(line, function(point, index) {
            var rel = point.minus(leftTop);
            if(index == 0)
              g.moveTo(rel.x.toJSNumber(), rel.y.toJSNumber());
            else
              g.lineTo(rel.x.toJSNumber(), rel.y.toJSNumber());
          });
          g.stroke();
          break;
        case Mode.ERASER:
          g.clearRect(0, 0, width, height);
          g.globalAlpha = strokeOpacity;
          g.globalCompositeOperation = "none";
          g.strokeStyle = "#FFFFFF";
          g.lineWidth = strokeWidth;
          g.lineCap = "round";
          g.lineJoin = "round";
          g.beginPath();
          _.each(line, function(point, index) {
            var rel = point.minus(leftTop);
            if(index == 0)
              g.moveTo(rel.x.toJSNumber(), rel.y.toJSNumber());
            else
              g.lineTo(rel.x.toJSNumber(), rel.y.toJSNumber());
          });
          g.stroke();
          break;
      }
    }
    function endStroke(last) {
      //edit line
      if(line.length == 1)
        doStroke(line[0], last);
      //prepare message
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
      //prepare stroke data
      var minX = null, minY = null;
      _.each(line, function(point) { //get offset
        if(minX == null)
          minX = point.x;
        else
          if(minX.greater(point.x))
            minX = point.x;
        if(minY == null)
          minY = point.y;
        else
          if(minY.greater(point.y))
            minY = point.y;
      });
      var offset = new Point(minX, minY);
      action.offset = offset.toData();
      action.stroke = _.map(line, function(point) {
        return point.minus(offset).toData();
      });
      var tempLayer = currentTempLayer;
      client.sendAction(action, function(err, actionId) {
        if(err) {
          console.log(err.message);
          tempLayer.remove();
        }
        else {
          console.log("action acknowledged: "+actionId);
          pendingActionLayers[actionId] = tempLayer;
        }
      });
    }

    //intermediate touch events
    function touchBegin(pt) {
      pressed = true;
      oldPosition = pt;
      switch(mode) {
        case Mode.BRUSH:
        case Mode.ERASER:
          beginStroke(clientToCanvas(pt));
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
            doStroke(clientToCanvas(oldPosition), clientToCanvas(pt));
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
            endStroke(clientToCanvas(pt));
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
      if(err) //TODO
        console.log(err);
      else
        console.log("undo action "+actionId);
    });
  };
  self.redo = function() {
    var action = {
      type: "REDO"
    };
    client.sendAction(action, function(err, actionId) {
      if(err) //TODO
        console.log(err);
      else
        console.log("redo action "+actionId);
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
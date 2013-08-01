var config = {
    TILES_SIZE: 128,
    TILES_PATH: "/tiles/",
    UNAVAILABLE_TILE_PATH: "/tiles/unavailable.png",
    WEBSOCKET_URL: 'ws://' + document.location.hostname + ':8081/big-canvas'
};

function Point(x, y) {
  this.x = x;
  this.y = y; 
}
Point.prototype.toLocation = function() {
  var size = config.TILES_SIZE,
      x = this.x,
      y = this.y;
  col = (x >= 0) ? Math.floor(x/size) : Math.floor(x/size)-1,
  row = (y >= 0) ? Math.floor(y/size) : Math.floor(y/size)-1;
  return new TileLocation(col, row);
};

function TileLocation(column, row) {
  this.column = column;
  this.row = row;
}
TileLocation.prototype.toFileName = function() {
  return this.column+"_"+this.row+".png";
};

/**
 * a tile is a small, fixed-size part of the big canvas
 * @param location the coordinates of this tile
 * @param isEmpty is empty when no data can be loaded from server
 * @event ready triggered if the tile is loaded
 */
function Tile(location, isEmpty) {
  var that = this;
  //initialize event listener
  _.extend(this, Backbone.Events);
  //set location and ready state
  this.location = location;
  this.ready = false;
  //create a canvas
  this.canvas = document.createElement("canvas");
  this.canvas.width = this.canvas.height = config.TILES_SIZE;
  var ctx = this.canvas.getContext("2d");
  //load image
  if(!isEmpty) {
    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      that.ready = true;
      that.trigger("ready");
    };
    image.src = config.TILES_PATH + location.toFileName();
  } else {
    ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    //ctx.fillStyle = "red";
    //ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    //ctx.strokeStyle = "green";
    //ctx.strokeRect(0,0,this.canvas.width, this.canvas.height);
    this.trigger("ready");
    this.ready = true;
  }
}

function TilesCache() {
  var that = this;
  
  _.extend(this, Backbone.Events);
  
  this.location = new TileLocation(0, 0);
  this.tiles = [[]];
  this.width = 0;
  this.height = 0;
  this.ready = true;
  
  this.get = function(location) {
    var w = location.column - this.location.column,
        h = location.row - this.location.row;
    if(w >= 0 && h >= 0 && w < this.width && h < this.height)
      return this.tiles[h][w];
    else
      return null;
  };
  
  this.foreach = function(func) {
    _.each(this.tiles, function(row) {
      _.each(row, function(tile) {
        func(tile);
      });
    });
  };
  
  this.foreachIntersecting = function(from, to, callback) {
    this.foreach(callback); //TODO find a more efficient method
  };
  
  /**
   * @param map is a bitmap of the form [[false], [true]] for a tiles cache of 2 height and 1 width 
   */
  this.load = function(location, map) {
    var newLocation = location,
        newHeight = map.length,
        newWidth = newHeight > 0 ? map[0].length : 0,
        newTiles = Array(newHeight),
        waiting = 0,
        onReady = function() {
          waiting--;
          if(waiting == 0)
            that.trigger("ready");
        };
    this.ready = false;
    this.trigger("unavailable");
    for(var h = 0; h < newHeight; h++) {
      newTiles[h] = Array(newWidth);
      for(var w = 0; w < newWidth; w++) {
        var loc = new TileLocation(newLocation.column + w, newLocation.row + h);
        var newTile = this.get(loc);
        var exists = map[h][w];
        if(newTile == null)
          newTile = new Tile(loc, !exists);
        newTiles[h][w] = newTile;
        //set ready event
        newTile.off();
        if(!newTile.ready) {
          waiting++;
          newTile.on("ready", onReady);
        }
      } 
    }
    this.location = newLocation;
    this.width = newWidth;
    this.height = newHeight;
    this.tiles = newTiles;
    if(waiting == 0)
      this.trigger("ready");
  };
}

/**
 * the big canvas
 * @param element the canvas object
 * @param originPoint where to start
 * @event move(origin) triggered when the user moves
 */
function BigCanvas(element, originPoint) {
  var that = this,
      mouseDown = false,
      oldPos = null,
      oldOrigin = null,
      connected = false,
      enabled = false,
      tilesCache = new TilesCache(),
      unavailableImage = new Image(),
      line = [];
  
  _.extend(this, Backbone.Events);
  
  this.color = "#FF0000";      
  this.origin = originPoint;
  this.drawMode = true;
  
  //setup empty image
  unavailableImage.src = config.UNAVAILABLE_TILE_PATH;
  
  //setup canvas
  var endDraw = function() {
    if(line.length > 0) {
      that.sendLine(line, that.color);
      line = [];
    }
  };
  var stroke = function(pointA, pointB) {
    var origin = that.origin,
        pixelHalfWidth = Math.floor(element.width / 2),
        pixelHalfHeight = Math.floor(element.height / 2),
        from = new Point(pointA.x - pixelHalfWidth + origin.x, pointA.y - pixelHalfHeight + origin.y),
        to = new Point(pointB.x - pixelHalfWidth + origin.x, pointB.y - pixelHalfHeight + origin.y);
    if(line.length == 0)
      line.push(from);
    line.push(to);
    that.drawLine([from, to], that.color);
  };
  $(element).mousedown(function(event){
    mouseDown = true;
    oldPos = new Point(event.pageX, event.pageY);
    oldOrigin = that.origin;
    if(that.drawMode && enabled)
      line = [];
  });
  $(element).mouseup(function(event){
    mouseDown = false;
    if(that.drawMode) {
      if(enabled)
        endDraw();
    }     
  });
  $(element).mouseleave(function(event) {
    if(that.drawMode && enabled)
      endDraw();
  });
  $(element).mousemove(function(event){
    if(mouseDown)
    {
      var newPos = new Point(event.pageX, event.pageY);
      if(that.drawMode) {
        if(enabled) {
          stroke(oldPos, newPos);    
          oldPos = newPos;
        }
      } else {
        that.moveTo(
            new Point(
                oldOrigin.x - (newPos.x - oldPos.x),
                oldOrigin.y - (newPos.y - oldPos.y)
            )
        );
      }
    }
  });
  
  //setup socket
  var socket = new WebSocket(config.WEBSOCKET_URL);
  socket.onopen = function() {
    connected = true;
    that.resize(window.innerWidth, window.innerHeight);
  };
  socket.onerror = function() {
    console.log("Websocket error!");
  };
  socket.onclose = function() {
    connected = false;
    alert("Connection closed! Please refresh this page.");
  };
  socket.onmessage = function(msg) {
    var packet = null;
    try {
      packet = JSON.parse(msg.data);
    } catch(e) {
      alert("Bad JSON syntax: "+msg.data);
      return;
    }
    if(packet.kind == "draw")
      that.drawLine(packet.line, packet.color);
    else if(packet.kind == "update")
      that.update(packet.location, packet.tiles);
  };
  var send = function(kind, object) {
    if(connected) {
      object["kind"] = kind;
      socket.send(JSON.stringify(object));
    }
  };
  
  //setup tiles cache
  tilesCache.on("ready", function() {
    enabled = true;
    that.repaint();
  });
  tilesCache.on("unavailable", function() {
    enabled = false;
    that.repaint();
  });
  
  this.drawLine = function(line, color) {
    var previous = null,
        size = config.TILES_SIZE,
        affectedTiles = [],
        context = element.getContext("2d");
    _.each(line, function(current) {
      if(previous != null) {
        tilesCache.foreachIntersecting(previous, current, function(tile) {
          //draw line
          var ctx = tile.canvas.getContext("2d"),
              x1 = previous.x - tile.location.column * size,
              y1 = previous.y - tile.location.row * size,
              x2 = current.x - tile.location.column * size,
              y2 = current.y - tile.location.row * size;
          ctx.strokeStyle = color;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          //add tile to affected collection
          if(!_.contains(affectedTiles, tile))
            affectedTiles.push(tile);
        });
      }
      previous = current;
    });
    _.each(affectedTiles, function(tile) {
      drawTile(context, tile);
    })
  };

  this.sendLine = function(line, color) {
    send("draw", {
      line: line,
      color: color
    });
  };
  
  this.update = function(location, tiles) {
    console.log("updating tiles...");
    var tloc = new TileLocation(location.column, location.row);
    tilesCache.load(tloc, tiles);
  };
  
  var drawTile = function(context, tile) {
    var pixelWidth = element.width,
        pixelHeight = element.height,
        size = config.TILES_SIZE,
        center = new Point(pixelWidth/2 - that.origin.x, pixelHeight/2 - that.origin.y),
        location = tile.location,
        position = new Point(Math.floor(center.x + location.column * size), Math.floor(center.y + location.row * size)),
        x = position.x >= 0 ? 0 : -position.x,
        y = position.y >= 0 ? 0 : -position.y,
        width = position.x >=0 ? size : size + position.x,
        height = position.y >=0 ? size : size + position.y;
    if(tile.ready && width > 0 && height > 0) {      
      var data = tile.canvas.getContext("2d").getImageData(x, y, width, height);
      context.putImageData(data, position.x + x, position.y + y);
      //context.strokeRect(position.x + x, position.y + y, width, height);
    } else
      context.drawImage(unavailableImage, position.x, position.y);
  };
  
  this.repaint = function() {
    var pixelWidth = element.width,
        pixelHeight = element.height,
        origin = this.origin,
        ctx = element.getContext("2d"),
        center = new Point(pixelWidth/2 - origin.x, pixelHeight/2 - origin.y);
    //clear canvas
    ctx.clearRect(0,0,pixelWidth,pixelHeight);
    
    //draw tiles
    tilesCache.foreach(function(tile) {
      drawTile(ctx, tile);
    });
  };
  
  var windowChanged = function() {
    send("move", {
      origin: that.origin,
      width: element.width,
      height: element.height
    });
  };
  
  this.resize = function(width, height) {
    element.width = width;
    element.height = height;
    windowChanged();
    this.repaint();
  };
  this.moveTo = function(newOriginPoint) {
    this.origin = newOriginPoint;
    windowChanged();
    this.trigger("move", this.origin);
    this.repaint();
  };
}

var Router = Backbone.Router.extend({
  routes: {
    "x=:x&y=:y": "setOrigin"
  }
});

function getRandom32BitNumber() {
  var result = 0;
  for(var i = 0; i < 30; i++) //bad style: only 30 not 31 to avoid shutdown of the connection at the border
    if(Math.random() <= 0.5)
      result |= 1 << i;
  if(Math.random() <= 0.5)
    result *= -1;
  return result;
}

$(function() {
  var element = $("#bigcanvas")[0];
  var canvas = new BigCanvas(element, new Point(0, 0));
  var moveButton = $("#moveButton");
  var pencilButton = $("#pencilButton");
  var colorPicker = $('#colorPicker');
  var router = new Router();
  router.on('route:setOrigin', function (x, y) {
    var xx = parseInt(x),
        yy = parseInt(y);
    if(!isNaN(xx) && !isNaN(yy)) {
      console.log("moving to (x: "+xx+";y: "+yy+")");
      canvas.moveTo(new Point(xx, yy))
    }
  });
  Backbone.history.start();
  var navigate = function(x, y) {
    router.navigate("#x="+x+"&y="+y, {trigger: true});
  };
  if(document.location.toString().indexOf("#") == -1) {
    var x = getRandom32BitNumber(), 
        y = getRandom32BitNumber();
    navigate(x, y);
  }
  canvas.on("move", function(origin) {
    navigate(origin.x, origin.y);
  });
  
  $(window).resize(function() {
    canvas.resize(window.innerWidth, window.innerHeight);
  }); 
  moveButton.click(function() {
    moveButton.addClass("activated");
    pencilButton.removeClass("activated");
    canvas.drawMode = false;
  });
  pencilButton.click(function() {
    moveButton.removeClass("activated");
    pencilButton.addClass("activated");
    canvas.drawMode = true;
  });
  colorPicker.palette({
    color: '#FF0000',
    onChange: function() {
      var color = "#"+colorPicker.data('palette').palette.data("palette").color.hex;
      canvas.color = color;
      colorPicker.css("background-color", color);
    }
  });
});
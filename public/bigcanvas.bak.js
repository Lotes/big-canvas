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
}

$(function() {
  var colorPicker = $('#colorPicker');

  colorPicker.palette({
    color: '#FF0000',
    onChange: function() {
      var color = "#"+colorPicker.data('palette').palette.data("palette").color.hex;
      canvas.color = color;
      colorPicker.css("background-color", color);
    }
  });
});
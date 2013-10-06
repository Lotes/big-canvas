var Config = require("./Config");
var Types = require("./Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var _ = require("underscore");
var Cache = require("./Cache");

/**
 * Represents all drawing actions needed to build and apply deltas to the resulting tiles.
 * @class Deltas
 * @param strategies {AbstractStrategies} client or server implementation of helper functions
 * @constructor
 */
function Deltas(strategies) {
  var deltasCache = new Cache(1024); //TODO move constant to config file
  /**
   * Represents a drawn delta with its boundaries.
   * @class Delta
   * @param min {TileLocation} the upper left tile location of this delta
   * @param max {TileLocation} the lower right tile location of this delta
   * @param canvas {Canvas} the actual delta image
   * @constructor
   */
  function Delta(min, max, canvas) {
    var region = null;
    this.getCanvas = function() { return canvas; };
    /**
     * Extracts a tile as canvas from the big delta image. Make sure that the location lies in the boundaries of
     * the delta.
     * @method getTile
     * @param location {TileLocation}
     * @returns {Canvas}
     */
    this.getTile = function(location) {
      location = new TileLocation(location.column, location.row);
      if(location.column.greaterOrEquals(min.column) && location.column.lesserOrEquals(max.column)
        && location.row.greaterOrEquals(min.row) && location.row.lesserOrEquals(max.row))
      {
        var size = Config.TILE_SIZE,
          result = strategies.createCanvas(size, size),
          g = canvas.getContext("2d"),
          rg = result.getContext("2d"),
          relativeColumn = location.column.minus(min.column).toJSNumber(),
          relativeRow = location.row.minus(min.row).toJSNumber(),
          left = relativeColumn * size,
          top = relativeRow * size,
          data = g.getImageData(left, top, size, size);
        rg.putImageData(data, 0, 0);
        return result;
      } else
        throw new Error("Location is not inside the delta!");
    };
    this.getRegion = function() {
      if(region != null)
        return region;
      region = [];
      var tileSize = Config.TILE_SIZE,
        leftTop = min.toPoint(),
        g = canvas.getContext("2d");
      for(var col=min.column; col.lesserOrEquals(max.column); col=col.next()) {
        for(var row=min.row; row.lesserOrEquals(max.row); row=row.next()) {
          //analyze tile
          var location = new TileLocation(col, row),
            position = location.toPoint().minus(leftTop),
            imageData = g.getImageData(position.x.toJSNumber(), position.y.toJSNumber(), tileSize, tileSize),
            data = imageData.data,
            found = false;
          for(var i=0; i<data.length; i++)
            if(data[i] != 0) {
              found = true;
              break;
            }
          if(!found)
            continue;
          region.push(location.toData());
        }
      }
      return region;
    };
  }

  /**
   * @method apply
   * @param baseCanvas {Canvas}
   * @param deltaTileCanvas {Canvas}
   * @param action {Action}
   * @param callback {Function(Error, Canvas)} returns the resulting canvas
   */
  this.apply = function(baseCanvas, deltaTileCanvas, action, callback) {
    try {
      var size = Config.TILE_SIZE,
        resultCanvas = strategies.createCanvas(size, size),
        g = resultCanvas.getContext("2d"),
        bg = baseCanvas.getContext("2d");
      //draw base revision
      g.putImageData(bg.getImageData(0, 0, size, size), 0, 0);
      //draw delta
      switch(action.type) {
        case "BRUSH":  g.globalCompositeOperation = "none"; break;
        case "ERASER": g.globalCompositeOperation = "destination-out"; break;
      }
      strategies.drawCanvas(resultCanvas, deltaTileCanvas);

      //return result
      callback(null, resultCanvas);
    } catch(ex) { callback(ex); }
  };

  /**
   * Draws a delta or retrieves it from the cache.
   * @method get
   * @param actionId
   * @param action
   * @param callback {Function(error, Delta)}
   */
  this.get = function(actionId, action, callback) {
    try {
      //ask cache
      var delta = deltasCache.get(actionId);
      if(delta != null) {
        callback(null, delta);
        return;
      }

      //estimate region
      var stroke = _.map(action.stroke, function(pt) { return new Point(pt.x, pt.y); });
      var bb = new BoundingBox();
      _.each(stroke, function(pt) { bb.addPoint(pt); });
      bb.extend(Math.ceil(action.width/2));
      var tileSize = Config.TILE_SIZE,
        locationMin = bb.getMin().toLocation(),
        locationMax = bb.getMax().toLocation(),
        horizontalTilesCount = locationMax.column.minus(locationMin.column).next().toJSNumber(),
        verticalTilesCount = locationMax.row.minus(locationMin.row).next().toJSNumber(),
        canvasWidth = tileSize * horizontalTilesCount,
        canvasHeight = tileSize * verticalTilesCount,
        leftTop = locationMin.toPoint();

      //create canvas
      var canvas = strategies.createCanvas(canvasWidth, canvasHeight),
        g = canvas.getContext("2d");

      //draw stroke
      stroke = _.map(stroke, function(pt) { return pt.minus(leftTop); });
      g.globalAlpha = action.opacity;
      g.strokeStyle = action.type === "BRUSH" ? action.color : "#FFFFFF";
      g.lineWidth = action.width;
      g.lineCap = "round";
      g.beginPath();
      _.each(stroke, function(pt, index) {
        var x = pt.x.toJSNumber(),
          y = pt.y.toJSNumber();
        if(index === 0)
          g.moveTo(x, y);
        else
          g.lineTo(x, y);
      });
      g.stroke();

      var result = new Delta(locationMin, locationMax, canvas);
      deltasCache.set(actionId, result);
      callback(null, result);
    } catch(ex) {
      callback(ex);
    }
  };
}

/**
 * Manages the "deltas" table.
 * @class Deltas
 */
module.exports = Deltas;
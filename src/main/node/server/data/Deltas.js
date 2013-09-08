var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var Utils = require("../ServerUtils");
var Config = require("../Config");
var Types = require("../ServerTypes");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var _ = require("underscore");
var Canvas = require("canvas");
var Counters = require("./Counters");
var Cache = require("../../Cache");
var deltasCache = new Cache(1024); //TODO move cache size to config

function Delta(min, max, canvas) {
  var region = null;
  this.getCanvas = function() { return canvas; };
  this.getTile = function(location) {
    location = new TileLocation(location.column, location.row);
    if(location.column.greaterOrEquals(min.column) && location.column.lesserOrEquals(max.column)
      && location.row.greaterOrEquals(min.row) && location.row.lesserOrEquals(max.row))
    {
      var size = Config.TILE_SIZE,
          result = new Canvas(size, size),
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
 * Manages the "deltas" table.
 * @class Deltas
 */
module.exports = {
  /**
   * @method applyDelta
   * @param baseCanvas {Canvas}
   * @param deltaCanvas {Canvas}
   * @param action {Action}
   * @param callback {Function(Error, Canvas)} returns the resulting canvas
   */
  applyDelta: function(baseCanvas, deltaCanvas, action, callback) {
    try {
      //callback(new Error("Deltas.applyDelta: Not implemented yet."));
      var size = Config.TILE_SIZE,
        resultCanvas = new Canvas(size, size),
        g = resultCanvas.getContext("2d"),
        bg = baseCanvas.getContext("2d");
      //draw base revision
      g.putImageData(bg.getImageData(0, 0, size, size), 0, 0);

      //draw delta
      switch(action.type) {
        case "BRUSH":  g.globalCompositeOperation = "none"; break;
        case "ERASER": g.globalCompositeOperation = "destination-out"; break;
      }
      var deltaImage = new Canvas.Image();
      deltaImage.src = deltaCanvas.toBuffer();
      g.drawImage(deltaImage, 0, 0, size, size);

      //return result
      callback(null, resultCanvas);
    } catch(ex) { callback(ex); }
  },

  /**
   * @method draw
   * @param actionId
   * @param action
   * @param callback {Function(error, Delta)}
   */
  draw: function(actionId, action, callback) {
    try {
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
      var canvas = new Canvas(canvasWidth, canvasHeight),
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
  }
};
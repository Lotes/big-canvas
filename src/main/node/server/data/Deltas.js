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

function Delta(boundingBox, canvas) {
  var min = boundingBox.getMin(),
      region = null;
  this.getCanvas = function() { return canvas; };
  this.getTile = function(location) {

  };
  this.getRegion = function() {
    if(region != null)
      return region;
    region = [];
    var locationMin = boundingBox.getMin(),
        locationMax = boundingBox.getMax(),
        leftTop = locationMin.toPoint(),
        g = canvas.getContext("2d");
    for(var col=locationMin.column; col.lesserOrEquals(locationMax.column); col=col.next()) {
      for(var row=locationMin.row; row.lesserOrEquals(locationMax.row); row=row.next()) {
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
  Delta: Delta,
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

      var delta = new Delta(bb, canvas);
      deltasCache.set(actionId, delta);
      callback(null, delta);
    } catch(ex) {
      callback(ex);
    }
  }
};
var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var redis = require("redis");
var client = redis.createClient();
var lock = require("../lock");
var BigInteger = require("big-integer");
var Utils = require("../ServerUtils");
var Canvas = require("canvas");
var _ = require("underscore");
var Config = require("../Config");
var Types = require("../ServerTypes");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var Deltas = require("./Deltas");

client.on("error", function(err) {
  console.error("[Jobs] "+err);
});

module.exports = {
  commit: function(region, actionId, enableAction, callback) {
    //TODO create |region| jobs
    //foreach(location in action.region)
    //  get index of actionId in tiles[location].actions
    //  set bitStrings index-th entry to "0"
    //  (re-)create a render job for location
    callback();
  },
  /**
   * Draws the deltas of an action, saves the images and returns the affected region
   * @method createDeltas
   * @param actionId {ActionId}
   * @param action {Action}
   * @param callback {Function(err, [TileLocation])}
   */
  createDeltas: function(actionId, action, callback) {
    try {
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
      //g.globalCompositeOperation = "xor";
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

      //determine affected region
      var region = [],
          finished = false,
          tilesCount = 0;
      for(var col=locationMin.column; col.lesserOrEquals(locationMax.column); col=col.next()) {
        for(var row=locationMin.row; row.lesserOrEquals(locationMax.row); row=row.next()) {
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
          tilesCount++;
          var tileCanvas = new Canvas(tileSize, tileSize);
          tileCanvas.getContext("2d").putImageData(imageData, 0, 0);
          Deltas.add(actionId, location.toData(), tileCanvas, function(err) {
            tilesCount--;
            if(err) throw new Error("Unexpected error while saving delta image ("+err.message+")!"); //TODO dirty, thick about a rollback or something?
            if(tilesCount == 0 && finished)
              callback(null, region);
          });
          region.push(location.toData());
        }
      }
      finished = true;
    } catch(ex) {
      callback(ex);
    }
  }
};
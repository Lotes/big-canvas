var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var lock = require("../lock");
var Utils = require("../ServerUtils");
var Config = require("../Config");
var fs = require("fs");
var Types = require("../ServerTypes");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;
var _ = require("underscore");
var Canvas = require("canvas");
var Counters = require("./Counters");

/**
 * @method saveImage
 * @param canvas
 * @param callback {Function(err, path)}
 */
function saveImage(client, canvas, callback) {
  Counters.lockDeltasCounter(function(done) {
    Counters.newId(client, "deltas", function(err, id) {
      done();
      if(err) { callback(err); return; }
      try {
        var path = id+".png";
        var fullName = Config.SERVER_DELTAS_PATH + "/" + path;
        var out = fs.createWriteStream(fullName),
            stream = canvas.pngStream();
        stream.on("data", function(chunk){ out.write(chunk); });
        stream.on("end", function() {
          callback(null, path);
        });
      } catch(ex) { callback(ex); }
    });
  });
}

function deleteRegionPaths(regionPaths) {
  _.each(regionPaths, function(location, path) {
    fs.unlink(Config.SERVER_DELTAS_PATH+"/"+path, function(err) {
      if(err) console.log(err.message);
    });
  });
}

/**
 * Manages the "deltas" table.
 * @class Deltas
 */
module.exports = {
  /**
   * @method deleteRegion
   * @param region
   */
  deleteRegionPaths: deleteRegionPaths,
  /**
   * @method draw
   * @param client
   * @param action
   * @param callback
   */
  draw: function(client, action, callback) {
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
      var regionPaths = {},
        finished = false,
        tilesCount = 0,
        error = null;

      function rollback() {
        if(tilesCount == 0 && finished && error) {
          deleteRegionPaths(regionPaths);
          callback(error);
        }
      }

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
          //tile is affected, save it
          tilesCount++;
          var tileCanvas = new Canvas(tileSize, tileSize);
          tileCanvas.getContext("2d").putImageData(imageData, 0, 0);
          saveImage(client, tileCanvas, (function(location) {
            return function(err, path) {
              tilesCount--;
              if(err) {
                error = err;
                rollback();
                return;
              }
              regionPaths[path] = location.toData();
              if(tilesCount == 0 && finished && !error)
                callback(null, regionPaths);
            };
          })(location));
        }
      }
      finished = true;
    } catch(ex) {
      callback(ex);
    }
  }
};
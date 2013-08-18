var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var lock = require("../lock");
var BigInteger = require("big-integer");
var Utils = require("../ServerUtils");
var _ = require("underscore");
var Config = require("../Config");
var Types = require("../ServerTypes");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var BoundingBox = Types.BoundingBox;

/**
 * Manages the "tiles" table.
 * @class Tiles
 */
module.exports = {
  /**
   * Locks a tile or a set of tiles.
   * @method lock
   * @param locations {TileLocation(s)}
   * @param callback
   */
  lock: function(locations, callback) {
    if(!Array.isArray(locations))
      locations = [locations];
    var count = locations.length;
    var dones = [];
    _.each(locations, function(location) {
      lock("tiles/"+location.column+":"+location.row, function(done) {
        dones.unshift(done);
        count--;
        if(count == 0) {
          callback(function() {
            _.each(dones, function(done) {
              done();
            });
          });
        }
      });
    });
  },
  appendAction: function(client, region, actionId, callback) {
    try {
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Invalid action id: ", actionId);
      if(!BigCanvasTypes.TileLocations.validate(region))
        throw new Error("Invalid region: ", JSON.stringify(region));
      var index = 0;
      function step() {
        if(index >= region.length) {
          callback();
          return;
        }
        var location = region[index];
        index++;
        //get new order index
        client.query("SELECT COUNT(*) AS num FROM tileActions WHERE col=? AND row=?", [location.column, location.row], function(err, results) {
          if(err) { callback(err); return; }
          try {
            var count = results[0].num;
            //insert new action into tile actions
            client.query("INSERT INTO tileActions (col, row, orderIndex, actionId) VALUES (?, ?, ?, ?)",
              [location.column, location.row, count, actionId], function(err)
            {
              if(err) { callback(err); return; }
              //check if tile already exists
              client.query("SELECT 1 FROM tiles WHERE col=? AND row=? LIMIT 1", [location.column, location.row], function(err, results) {
                if(err) { callback(err); return; }
                if(results.length == 0) {
                  //entry does not exist, create one
                  client.query("INSERT INTO tiles (col, row, isValid, actionBitString, lastRevision) VALUES (?, ?, ?, ?, ?)",
                    [location.column, location.row, 0, "1", 0], function(err)
                    {
                      if(err) { callback(err); return; }
                      step();
                    });
                } else {
                  //entry does exist, update
                  client.query("UPDATE tiles SET isValid=0, actionBitString=CONCAT(actionBitString, '1') WHERE col=? AND row=?",
                    [location.column, location.row], function(err, result)
                    {
                      if(err) { callback(err); return; }
                      if(result.affectedRows == 0) { callback(new Error("Could not update tile!")); return; }
                      step();
                    });
                }
              });
            });
          } catch(ex) { callback(ex); }
        });
      }
      step();
    } catch(ex) {
      callback(ex);
    }
  }
};
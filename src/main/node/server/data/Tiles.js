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
  },
  /**
   * @method toggleAction
   * @param client
   * @param region
   * @param actionId
   * @param isset
   * @param callback
   */
  toggleAction: function(client, region, actionId, isset, callback) {
    try {
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Invalid action id: ", actionId);
      if(!BigCanvasTypes.TileLocations.validate(region))
        throw new Error("Invalid region: ", JSON.stringify(region));
      if(!BigCanvasTypes.Boolean.validate(isset))
        throw new Error("Invalid boolean: ", isset);
      var index = 0;
      function step() {
        if(index >= region.length) {
          callback();
          return;
        }
        var location = region[index];
        index++;
        //determine the index of the action
        client.query("SELECT orderIndex FROM tileActions WHERE col=? AND row=? AND actionId=? LIMIT 1",
          [location.column, location.row, actionId], function(err, results)
          {
            if(err) { callback(err); return; }
            if(results.length == 0) { callback(new Error("Action was not applied at this location (actionId="+actionId+", column="+location.column+", row="+location.row+").")); return; }
            var orderIndex = results[0].orderIndex;
            //get tiles bit string
            client.query("SELECT actionBitString FROM tiles WHERE col=? AND row=? LIMIT 1",
              [location.column, location.row], function(err, results)
              {
                if(err) { callback(err); return; }
                if(results.length == 0) { callback(new Error("Tile does not exist (column="+location.column+", row="+location.row+").")); return; }
                var actionBitString = results[0].actionBitString;
                var char = isset ? "1" : "0";
                actionBitString = actionBitString.substr(0, index) + char + actionBitString.substr(index+1);
                //update tile
                client.query("UPDATE tiles SET isValid=0, actionBitString=? WHERE col=? AND row=?",
                  [actionBitString, location.column, location.row], function(err, result)
                  {
                    if(err) { callback(err); return; }
                    if(result.affectedRows == 0) { callback(new Error("Could not update tile.")); return; }
                    step();
                  });
              });
          });
      }
      step();
    } catch(err) { callback(err); }
  }
};
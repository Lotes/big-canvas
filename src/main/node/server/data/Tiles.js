var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var redis = require("redis");
var client = redis.createClient();
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

  }
};
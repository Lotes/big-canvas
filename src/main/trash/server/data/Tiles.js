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

function locationToKey(location) {
  if(!BigCanvasTypes.TileLocation.validate(location))
    throw new Error("Invalid tile location: "+JSON.stringify(location));
  return "tiles/"+location.column+":"+location.row;
}

function lockTile(location, callback) {
  var tileKey = locationToKey(location);
  var lockKey = "locks/"+tileKey;
  lock(lockKey, callback);
}

function tileExists(location, callback) {
  try {
    var key = locationToKey(location);
    client.exists(key, callback);
  } catch(ex) {
    callback(ex);
  }
}

function tileCreate(location, callback) {
  try {
    var tileKey = locationToKey(location),
        tileActionBitStringKey = tileKey+"/bitString",
        tileValidKey = tileKey+"/valid";
    client.set(tileValidKey, Utils.stringify(true), function(err) {
      if(err) { callback(err); return; }
      client.set(tileActionBitStringKey, "", callback)
    });
  } catch(ex) {
    callback(ex);
  }
}

function addAction(location, actionId, callback) {
  lockTile(location, function(done) {
    function success() {
      callback();
      done();
    }
    function fail(ex) {
      callback(ex);
      done();
    }
    function appendAction() {
      success();
    }
    tileExists(location, function(err, exists) {
      if(err) { fail(err); return; }
      if(!exists) {
        tileCreate(location, function(err) {
          if(err) { fail(err); return; }
          appendAction();
        });
      } else
        appendAction();
    });
  });
}

module.exports = {
  lock: lockTile,
  exists: tileExists,
  create: tileCreate,

  addAction: addAction,

  addActionBatch: function(region, actionId, callback) {
    try {
      if(!BigCanvasTypes.TileLocations.validate(region))
        throw new Error("Invalid region: "+JSON.stringify(region));
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Invalid action id: "+actionId);
      var countDown = region.length;
      _.each(region, function(location) {
        addAction(location, actionId, function(err) {
          if(err) throw new Error("Error while updating tile ("+err.message+")!"); //TODO dirty
          countDown--;
          if(countDown == 0)
            callback();
        });
      });
    } catch(ex) {
      callback(ex);
    }
  }
};
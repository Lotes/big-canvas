var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var redis = require("redis");
var client = redis.createClient();
var lock = require("../lock");
var Utils = require("../ServerUtils");
var BigInteger = require("big-integer");
var Config = require("../Config");
var fs = require("fs");

client.on("error", function(err) {
  console.error("[Deltas] "+err);
});

function toDeltaKey(actionId, location) {
  if(!BigCanvasTypes.ActionId.validate(actionId))
    throw new Error("Invalid action id: "+userId);
  if(!BigCanvasTypes.TileLocation.validate(location))
    throw new Error("Invalid tile location: "+JSON.stringify(location));
  return "deltas/"+actionId+"@"+location.column+":"+location.row;
}

function getDeltaPathNameId(callback) {
  var counterKey = "deltas/counter";
  var lockKey = "locks/"+counterKey;
  lock(lockKey, function(done) {
    client.get(counterKey, function(err, data) {
      if(err) {
        callback(err);
        done();
      } else {
        try {
          var id = BigInteger(data || "0");
          var nextId = id.next();
          client.set(counterKey, nextId.toString(), function(err) {
            if(err) {
              callback(err);
              done();
            } else {
              callback(null, id.toString());
              done();
            }
          });
        } catch(ex) {
          callback(ex);
          done();
        }
      }
    });
  });
}

module.exports = {
  getDeltaId: getDeltaPathNameId,
  add: function(actionId, location, tileCanvas, callback) {
    getDeltaPathNameId(function(err, id) {
      if(err) { callback(err); return; }
      try {
        var key = toDeltaKey(actionId, location);
        var pathName = id+".png";
        var deltaData = Utils.stringifyMembers({
          path: pathName
        });
        var fullName = Config.SERVER_DELTAS_PATH + "/" + pathName;
        var out = fs.createWriteStream(fullName),
            stream = tileCanvas.pngStream();
        stream.on("data", function(chunk){ out.write(chunk); });
        stream.on("end", function() {
          client.hmset(key, deltaData, callback);
        });
      } catch(ex) { callback(ex); }
    });
  }
};
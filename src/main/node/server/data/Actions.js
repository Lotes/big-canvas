var redis = require("redis");
var client = redis.createClient();
var lock = require("redis-lock")(client);
var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var BigInteger = require("big-integer");
var Utils = require("../ServerUtils");

client.on("error", function(err) {
  console.error("[Actions] "+err);
});

function actionIdToKey(actionId) {
  if(!BigCanvasTypes.ActionId.validate(actionId))
    throw new Error("Invalid action id: "+actionId);
  return "actions/"+actionId;
}

module.exports = {
  generateId: function(callback) {
    var counterKey = "action/counter";
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
                var actionId = id.toString();
                callback(null, actionId);
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
  },
  lock: function(actionId, callback) {
    var actionKey = actionIdToKey(actionId);
    var lockKey = "locks/"+actionKey;
    lock(lockKey, callback);
  },
  get: function(actionId, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      client.hgetall(userKey, function(err, action) {
        if(err)
          callback(err);
        else {
          try{
            action = Utils.parseMembers(action);
            if(!BigCanvasTypes.ActionData.validate(action))
              throw new Error("Action has bad format (actionId: "+actionId+").");
            callback(null, action);
          } catch(ex) {
            callback(ex);
          }
        }
      });
    } catch(ex) {
      callback(ex);
    }
  },
  setUndone: function(actionId, undone, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      if(!BigCanvasTypes.Boolean.validate(undone))
        throw new Error("Bad format for boolean: "+undone);
      var value = Utils.stringify(undone);
      client.hset(actionKey, "undone", value, callback);
    } catch(ex) {
      callback(ex);
    }
  }
};
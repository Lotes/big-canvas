var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var redis = require("redis");
var client = redis.createClient();
var lock = require("../lock");
var BigInteger = require("big-integer");
var NameGenerator = require("../NameGenerator");
var Utils = require("../ServerUtils");

client.on("error", function(err) {
  console.error("[Users] "+err);
});

function userIdToKey(userId) {
  if(!BigCanvasTypes.UserId.validate(userId))
    throw new Error("Invalid user id: "+userId);
  return "users/"+userId;
}

module.exports = {
  create: function(callback) {
    var counterKey = "users/counter";
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
                try {
                  var user = {
                    name: NameGenerator.generate(),
                    lastActionId: "-1",
                    firstActionId: "-1"
                  };
                  user = Utils.stringifyMembers(user);
                  var userId = id.toString();
                  var userKey = userIdToKey(userId);
                  client.hmset(userKey, user, function(err) {
                    if(err)
                      callback(err);
                    else
                      callback(null, userId);
                    done();
                  });
                } catch(ex) {
                  callback(ex);
                  done();
                }
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
  lock: function(userId, callback) {
    var userKey = userIdToKey(userId),
        lockKey = "locks/"+userKey;
    lock(lockKey, callback);
  },
  get: function(userId, callback) {
    try {
      var userKey = userIdToKey(userId);
      client.hgetall(userKey, function(err, user) {
        if(err)
          callback(err);
        else {
          try{
            user = Utils.parseMembers(user);
            if(!BigCanvasTypes.UserData.validate(user))
              throw new Error("Action has bad format (actionId: "+userId+").");
            callback(null, user);
          } catch(ex) {
            callback(ex);
          }
        }
      });
    } catch(ex) {
      callback(ex);
    }
  },
  setName: function(userId, name, callback) {
    try {
      var userKey = userIdToKey(userId);
      var value = Utils.stringify(name);
      client.hset(userKey, "name", value, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  setLastActionId: function(userId, lastActionId, callback) {
    try {
      var userKey = userIdToKey(userId);
      if(!BigCanvasTypes.ActionId.validate(lastActionId))
        throw new Error("Invalid action id: "+lastActionId);
      var value = Utils.stringify(lastActionId);
      client.hset(userKey, "lastActionId", value, callback);
    } catch(ex) {
      callback(ex);
    }
  }
};
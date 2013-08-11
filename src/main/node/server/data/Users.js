var BigCanvasTypes = require("../BigCanvas").BigCanvasTypes;
var redis = require("redis");
var client = redis.createClient();
var lock = require("redis-lock")(client);
var BigInteger = require("big-integer");
var NameGenerator = require("../NameGenerator");

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
                    name: NameGenerator.generate()
                  };
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
      client.hgetall(userKey, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  setName: function(userId, name, callback) {
    try {
      var userKey = userIdToKey(userId);
      client.hset(userKey, "name", name, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  setLastActionId: function(userId, lastActionId, callback) {
    try {
      var userKey = userIdToKey(userId);
      if(!BigCanvasTypes.ActionId.validate(lastActionId))
        throw new Error("Invalid action id: "+lastActionId);
      client.hset(userKey, "lastActionId", lastActionId, callback);
    } catch(ex) {
      callback(ex);
    }
  }
};
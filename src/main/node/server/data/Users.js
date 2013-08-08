var BigCanvasTypes = require("../BigCanvas").BigCanvasTypes;
var redis = require("redis");
var redisClient = redis.createClient();
var lock = require("redis-lock")(redisClient);
var BigInteger = require("big-integer");
var NameGenerator = require("../NameGenerator");

redisClient.on("error", function(err) {
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
      redisClient.get(counterKey, function(err, data) {
        if(err) {
          callback(err);
          done();
        } else {
          try {
            var id = BigInteger(data || "0");
            var nextId = id.next();
            redisClient.set(counterKey, nextId.toString(), function(err) {
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
                  redisClient.hmset(userKey, user, function(err) {
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
  get: function(userId, callback) {
    try {
      var userKey = userIdToKey(userId);
      redisClient.hgetall(userKey, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  setName: function(userId, name, callback) {
    try {
      var userKey = userIdToKey(userId);
      redisClient.hset(userKey, "name", name, callback);
    } catch(ex) {
      callback(ex);
    }
  }
};
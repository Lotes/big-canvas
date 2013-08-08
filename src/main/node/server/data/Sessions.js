var redis = require("redis");
var redisClient = redis.createClient();

redisClient.on("error", function(err) {
  console.error("[Sessions] "+err);
});

function sessionIdToKey(sessionId) {
  return "sessions/"+sessionId;
}

module.exports = {
  destroy: function(sessionId, callback) {
    var key = sessionIdToKey(sessionId);
    redisClient.del(key, callback);
  },
  get: function(sessionId, callback) {
    var key = sessionIdToKey(sessionId);
    redisClient.get(key, function(err, result) {
      if(err)
        callback(err);
      else {
        if(!result) {
          callback();
        }
        else
          try {
            var sessionObj = JSON.parse(result);
            callback(null, sessionObj);
          } catch(ex) {
            callback(ex);
          }
      }
    });
  },
  set: function(sessionId, sessionObj, callback) {
    var key = sessionIdToKey(sessionId);
    try {
      //TODO update expiration date from expires attribute
      //{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"userId":16}
      var ttl = 60;
      var data = JSON.stringify(sessionObj);
      redisClient.setex(key, ttl, data, callback);
    } catch (err) {
      fn && fn(err);
    }
  }
};
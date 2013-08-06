var BigCanvasTypes = require("../BigCanvas").BigCanvasTypes;
var redis = require("redis");
var redisClient = redis.createClient();

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

  },
  get: function(id, callback) {

  },
  setName: function(id, name, callback) {

  }
};
var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var redis = require("redis");
var client = redis.createClient();
var lock = require("redis-lock")(client);
var BigInteger = require("big-integer");
var Utils = require("../ServerUtils");

client.on("error", function(err) {
  console.error("[Jobs] "+err);
});

module.exports = {
  commit: function(region, actionId, enableAction, callback) {
    //TODO create |region| jobs
    //foreach(location in action.region)
    //  get index of actionId in tiles[location].actions
    //  set bitStrings index-th entry to "0"
    //  (re-)create a render job for location
    callback();
  }
};
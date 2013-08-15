var redis = require("redis");
var client = redis.createClient();
var lock = require("../lock");
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
  /**
   * adds a new action
   * @method addNew
   * @param actionId {String} the id of the new action
   * @param action {Object} an action object, see "Action" definition in the RPC definition file
   * @param userId {String} id of the user performing this action
   * @param previousActionId {String} the id of the previous action performed by the same user
   * @param callback
   */
  addNew: function(actionId, action, userId, previousActionId, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      if(!BigCanvasTypes.UserId.validate(userId))
        throw new Error("Bad format for user id (="+userId+").");
      if(!BigCanvasTypes.ActionId.validate(previousActionId))
        throw new Error("Bad format for previous action id (="+previousActionId+").");
      var actionData = Utils.copy(action);
      actionData.userId = userId;
      actionData.undone = false;
      actionData.region = [];
      actionData.timestamp = new Date().getTime().toString();
      actionData.previousActionId = previousActionId;
      actionData.nextActionId = "-1";
      if(!BigCanvasTypes.ActionData.validate(actionData))
        throw new Error("Bad format for action data (="+JSON.stringify(actionData)+").");
      actionData = Utils.stringifyMembers(actionData);
      client.hmset(actionKey, actionData, callback);
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
  },
  setRegion: function(actionId, region, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      if(!BigCanvasTypes.TileLocations.validate(region))
        throw new Error("Bad format for region: "+JSON.stringify(region));
      var value = Utils.stringify(region);
      client.hset(actionKey, "region", value, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  setNextActionId: function(actionId, nextActionId, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      if(!BigCanvasTypes.ActionId.validate(nextActionId))
        throw new Error("Bad format for action id: "+nextActionId);
      var value = Utils.stringify(nextActionId);
      client.hset(actionKey, "nextActionId", value, callback);
    } catch(ex) {
      callback(ex);
    }
  }
};
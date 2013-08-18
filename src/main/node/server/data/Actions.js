var lock = require("../lock");
var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var BigInteger = require("big-integer");
var Counters = require("./Counters");

/**
 * Manages the "actions" table.
 * @class Actions
 */
module.exports = {
  /**
   * @method newId
   * @param client
   * @param callback
   */
  newId: function(client, callback) {
    Counters.lockActionsCounter(function(done) {
      function success(value) { done(); callback(null, value); }
      function fail(err) { done(); callback(err); }
      Counters.newId(client, "actions", function(err, id) {
        if(err) fail(err);
        else success(id);
      });
    });
  },
  /**
   * @method lock
   * @param actionId
   * @param callback
   */
  lock: function(actionId, callback) {
    lock("actions/"+actionId, callback);
  },
  /**
   * @method get
   * @param client
   * @param actionId
   * @param callback
   */
  get: function(client, actionId, callback) {
    try {
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Invalid action id: "+actionId+"!");
      client.query(
        "SELECT type, actionObject, userId, undone, region, timestamp, previousActionId, nextActionId "+
        "FROM actions WHERE id=? LIMIT 1", [actionId], function(err, results)
      {
        if(err)
          callback(err);
        else {
          try{
            if(results.length == 0)
              throw new Error("No action with id="+actionId+" found!");
            var action = results[0];
            action.actionObject = JSON.parse(action.actionObject);
            action.region = JSON.parse(action.region);
            action.undone = action.undone != 0;
            if(!BigCanvasTypes.ActionData.validate(action))
              throw new Error("Invalid action data (actionId: "+actionId+").");
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
   * @method create
   * @param client {MySQLClient}
   * @param actionId {String} the id of the new action
   * @param action {Object} an action object, see "Action" definition in the RPC definition file
   * @param userId {String} id of the user performing this action
   * @param previousActionId {String} the id of the previous action performed by the same user
   * @param region {TileLocations} the affected region
   * @param callback {Function(err)}
   */
  create: function(client, actionId, action, userId, previousActionId, region, callback) {
    try {
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Invalid action id (="+actionId+").");
      if(!BigCanvasTypes.Action.validate(action))
        throw new Error("Invalid action format (="+JSON.stringify(action)+").");
      if(!BigCanvasTypes.UserId.validate(userId))
        throw new Error("Bad format for user id (="+userId+").");
      if(!BigCanvasTypes.ActionId.validate(previousActionId))
        throw new Error("Bad format for previous action id (="+previousActionId+").");
      if(!BigCanvasTypes.TileLocations.validate(region))
        throw new Error("Bad format for region (="+JSON.stringify(region)+").");
      var parameters = [
        actionId,
        action.type,
        JSON.stringify(action),
        userId,
        0,
        JSON.stringify(region),
        new Date().getTime(),
        previousActionId,
        "-1"
      ];
      client.query(
        "INSERT INTO actions"
          +"(id, type, actionObject, userId, undone, region, timestamp, previousActionId, nextActionId)"+
          "VALUES(?,?,?,?,?,?,?,?,?)", parameters, callback);
    } catch(ex) {
      callback(ex);
    }
  },
  /**
   * @method setUndone
   * @param client
   * @param actionId
   * @param undone
   * @param callback
   */
  /*setUndone: function(client, actionId, undone, callback) {
    try {
      var actionKey = actionIdToKey(actionId);
      if(!BigCanvasTypes.Boolean.validate(undone))
        throw new Error("Bad format for boolean: "+undone);
      var value = Utils.stringify(undone);
      client.hset(actionKey, "undone", value, callback);
    } catch(ex) {
      callback(ex);
    }
  },                  */
  /**
   * @method setNextActionId
   * @param client
   * @param actionId
   * @param nextActionId
   * @param callback
   */
  setNextActionId: function(client, actionId, nextActionId, callback) {
    try {
      if(!BigCanvasTypes.ActionId.validate(actionId))
        throw new Error("Bad format for action id: "+actionId);
      if(!BigCanvasTypes.ActionId.validate(nextActionId))
        throw new Error("Bad format for next action id: "+nextActionId);
      client.query("UPDATE actions SET nextActionId=? WHERE id=?", [nextActionId, actionId], function(err, result) {
        if(err) callback(err);
        else if(result.affectedRows == 0) callback(new Error("No action updated."));
        else callback();
      });
    } catch(ex) {
      callback(ex);
    }
  }
};
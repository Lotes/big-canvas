var BigCanvasTypes = require("../BigCanvasDefinitions").Types;
var lock = require("../lock");
var BigInteger = require("big-integer");
var NameGenerator = require("../NameGenerator");
var Utils = require("../ServerUtils");
var Counters = require("./Counters");

function checkUserId(userId) {
  if(!BigCanvasTypes.UserId.validate(userId))
    throw new Error("Invalid user id: ", userId);
}

function userUpdated(userId, callback) {
  return function(err, result) {
    if(err)
      callback(err);
    else if(result.affectedRows == 0)
      callback(new Error("No user with id=", userId, " found."));
    else
      callback();
  };
}

/**
 * @class Users
 */
module.exports = {
  /**
   * creates a user with a random name and an empty statistic; uses a lock
   * @method create
   * @param client {MySQLClient}
   * @param callback {Function(err, userId)}
   */
  create: function(client, callback) {
    Counters.lockUsersCounter(function(done) {
      function success(value) { done(); callback(null, value); }
      function fail(err) { done(); callback(err); }
      Counters.newId(client, "users", function(err, id) {
        if(err) { fail(err); return; }
        try {
          var user = {
            id: id,
            name: NameGenerator.generate(),
            firstActionId: "-1",
            lastActionId: "-1",
            numBrushStrokes: "0",
            numEraserStrokes: "0",
            numUndos: "0",
            numRedos: "0"
          };
          client.query(
            "INSERT INTO users SET ?",
            [user],
            function(err) {
              if(err) { fail(err); return; }
              success(id);
            });
        } catch(ex) { fail(ex); }
      });
    });
  },
  /**
   * locks a user by his id
   * @method lock
   * @param userId {UserId}
   * @param callback {Function(done)}
   */
  lock: function(userId, callback) {
    lock("users/"+userId, callback);
  },
  /**
   * get users data
   * @method get
   * @param client {MySQLClient}
   * @param userId {UserId}
   * @param callback {Function(err,UserData)}
   */
  get: function(client, userId, callback) {
    try {
      checkUserId(userId);
      client.query(
        "SELECT name, firstActionId, lastActionId, numBrushStrokes, numEraserStrokes, numUndos, numRedos"
          +" FROM users WHERE id=? LIMIT 1", [userId], function(err, results)
        {
          if(err) { callback(err); return; }
          if(results.length == 0) { callback(new Error("No user with given id found (id="+userId+").")); return; }
          callback(null, results[0]);
        });
    } catch(ex) {
      callback(ex);
    }
  },
  /**
   * sets the name of the user
   * @method setName
   * @param client
   * @param userId
   * @param name
   * @param callback
   */
  setName: function(client, userId, name, callback) {
    try {
      checkUserId(userId);
      if(!BigCanvasTypes.String.validate(name))
        throw new Error("Invalid user name: ", name);
      client.query("UPDATE users SET name=? WHERE id=?", [name, userId], userUpdated(userId, callback));
    } catch(ex) {
      callback(ex);
    }
  },
  /**
   * @method setFirstActionId
   * @param client
   * @param userId
   * @param firstActionId
   * @param callback
   */
  setFirstActionId: function(client, userId, firstActionId, callback) {
    try {
      checkUserId(userId);
      if(!BigCanvasTypes.ActionId.validate(firstActionId))
        throw new Error("Invalid first action id: ", lastActionId);
      client.query("UPDATE users SET firstActionId=? WHERE id=?", [firstActionId, userId], userUpdated(userId, callback));
    } catch(ex) {
      callback(ex);
    }
  },
  /**
   * @method setLastActionId
   * @param client
   * @param userId
   * @param lastActionId
   * @param callback
   */
  setLastActionId: function(client, userId, lastActionId, callback) {
    try {
      checkUserId(userId);
      if(!BigCanvasTypes.ActionId.validate(lastActionId))
        throw new Error("Invalid last action id: ", lastActionId);
      client.query("UPDATE users SET lastActionId=? WHERE id=?", [lastActionId, userId], userUpdated(userId, callback));
    } catch(ex) {
      callback(ex);
    }
  },
  /**
   * @method incrementUsageStatistics
   * @param client
   * @param userId
   * @param actionType
   * @param callback
   */
  incrementUsageStatistics: function(client, userId, actionType, callback) {
    try {
      checkUserId(userId);
      if(!BigCanvasTypes.ActionType.validate(actionType))
        throw new Error("Invalid action type: ", actionType);
      var column = "invalid";
      switch(actionType) {
        case "BRUSH":  column = "numBrushStrokes"; break;
        case "ERASER": column = "numEraserStrokes"; break;
        case "UNDO":   column = "numUndos"; break;
        case "REDO":   column = "numRedos"; break;
      }
      client.query("SELECT "+column+" FROM users WHERE id=? LIMIT 1", [userId], function(err, results) {
        if(err) { callback(err); return; }
        try {
          if(results.length == 0)
            throw new Error("No user with id=", userId, " found.")
          var value = BigInteger(results[0][column]).next().toString();
          client.query("UPDATE users SET "+column+"=? WHERE id=?", [value, userId], userUpdated(userId, callback));
        } catch(ex) { callback(ex); }
      });
    } catch(ex) {
      callback(ex);
    }
  }

};
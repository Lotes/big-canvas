var BigInteger = require("big-integer");
var lock = require("../lock");
/**
 * Provides an interface to the Counters table.
 * @class Counters
 */
module.exports = {
  /**
   * Increments a counter and returns its previous value. Make sure to lock the code before calling this function.
   * @method newId
   * @param client {MySQLClient} the database connection
   * @param name {String} name of the counter
   * @param callback {Function(err, value)}
   */
  newId: function(client, name, callback) {
    client.query("SELECT value FROM counters WHERE name=?", [name], function(err, result) {
      if(err) { callback(err); return; }
      if(result.length == 0) {
        client.query("INSERT INTO counters (name, value) VALUES (?, ?)", [name, "1"], function(err, result) {
          if(err) { callback(err); return; }
          callback(null, "0");
        });
      } else {
        var answer = result[0].value;
        var value = BigInteger(answer).next();
        client.query("UPDATE counters SET value=? WHERE name=?", [value.toString(), name], function(err, result) {
          if(err) { callback(err); return; }
          callback(null, answer);
        });
      }
    });
  },
  lockUsersCounter: function(callback) {
    lock("counters/users", callback);
  },
  lockActionsCounter: function(callback) {
    lock("counters/actions", callback);
  },
  lockVersionsCounter: function(callback) {
    lock("counters/versions", callback);
  }
};
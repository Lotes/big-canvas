var BigCanvasTypes = require("../../rpc/BigCanvasDefinitions").Types;
/**
 * Manages the "sessions" table.
 * @class Sessions
 */
module.exports = {
  /**
   * @method destroy
   * @param client
   * @param sessionId
   * @param callback
   */
  destroy: function(client, sessionId, callback) {
    client.query("DELETE FROM sessions WHERE id=?", [sessionId], function(err, result) {
      if(err) callback(err);
      else if(result.affectedRows == 0) callback(new Error("Session not found!"));
      else callback();
    });
  },
  /**
   * @method get
   * @param client
   * @param sessionId
   * @param callback
   */
  get: function(client, sessionId, callback) {
    client.query("SELECT content FROM sessions WHERE id=? LIMIT 1", [sessionId], function(err, results) {
      if(err) callback(err);
      else if(results.length == 0) callback();
      else try {
          var sessionObject = JSON.parse(results[0].content);
          callback(null, sessionObject);
        } catch(ex) {
          callback(ex);
        }
    });
  },
  /**
   * @method set
   * @param client
   * @param sessionId
   * @param sessionObj
   * @param callback
   */
  set: function(client, sessionId, sessionObj, callback) {
    client.query("SELECT 1 FROM sessions WHERE id=? LIMIT 1", [sessionId], function(err, results) {
      if(err) callback(err);
      else
      try {
        var content = JSON.stringify(sessionObj);
        var userId = sessionObj.userId;
        if(!BigCanvasTypes.UserId.validate(userId))
          throw new Error("Invalid user id!");
        if(results.length == 0) {
          client.query("INSERT INTO sessions (id, content, userId) VALUES (?, ?, ?)", [sessionId, content, userId], function(err, result) {
            if(err) callback(err);
            else if(result.affectedRows == 0)
              callback(new Error("No session created!"));
            else
              callback();
          });
        } else {
          client.query("UPDATE sessions SET content=?, userId=? WHERE id=?", [content, userId, sessionId], function(err, result) {
            if(err) callback(err);
            else if(result.affectedRows == 0)
              callback(new Error("No session updated!"));
            else
              callback();
          });
        }
      } catch(ex) {
        callback(ex);
      }
    });
  }
};
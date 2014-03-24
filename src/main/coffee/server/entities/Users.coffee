{ User } = require("../../BasicTypes")

module.exports = {
  get: (connection, userId, callback) ->
    connection.query("SELECT name, defaultColor FROM users WHERE id=? LIMIT 1", [userId], (err, results) =>
      if(err)
        callback(err)
        return
      if(results.length == 0)
        callback(new Error("Users.get(): Unknown user (id="+userId+")"))
      else
        result = results[0]
        callback(null, new User(userId, result["name"], result["defaultColor"]))
    )
  setDefaultColor: (connection, userId, newColor, callback) ->
}
{ User } = require("../../BasicTypes")

module.exports = {
  #REMARK: lock the users table before applying this function
  findAndUpdateGoogle: (connection, openId, name, callback) ->
    connection.query("SELECT id FROM users WHERE openId=? LIMIT 1", [openId], (err, results) ->
      if(err)
        callback(err)
        return
      if(results.length == 0)
        connection.query("SELECT MAX(id)+1 AS newId FROM users", (err, results) ->
          if(err)
            callback(err)
          else
            newId = results[0].newId
            connection.query("INSERT INTO users (id, name, openId, defaultColor) VALUES (?, ?, ?, '#FF0000')", [newId, name, openId], (err) ->
              if(err)
                callback(err)
              else
                callback(null, newId)
            )
        )
      else
        userId = results[0].id
        connection.query("UPDATE users SET name=? WHERE id=?", [name, userId], (err) ->
          if(err)
            callback(err)
          else
            callback(null, userId)
        )
    )
  get: (connection, userId, callback) ->
    connection.query("SELECT name, defaultColor FROM users WHERE id=? LIMIT 1", [userId], (err, results) ->
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
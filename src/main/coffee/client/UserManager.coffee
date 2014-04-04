{ Logger } = require("../logging/Logger")
{ User, UserCollection } = require("./models")

logger = new Logger("UserManager")

class UserManager
  constructor: (@client) ->
    @users = new UserCollection()
  get: (userId) ->
    user = @users.get(userId)
    if(!user)
      user = @users.push({ id: userId })
      @client.getUserByUserId(userId, (err, data) ->
        if(!err)
          user.set({
            name: data[1],
            color: data[2]
          })
        else
          logger.error("getting user: "+err.message)
      )
    return user

module.exports = { UserManager }
DatabaseConnection = require("./database/DatabaseConnection")
Users = require("./entities/Users")

class ClientContext
  constructor: (@clientId) ->
    @user = null
    @site = null
    @window = null
  setUser: (userId, callback) ->
    connection = new DatabaseConnection()
    connection.connect((err) =>
      if(err)
        callback(err)
        return
      Users.get(connection, userId, (err, user) =>
        if(err)
          callback(err)
        else
          @user = user
          callback(null, user)
      )
    )
  setSite: (siteId, callback) ->
    #site
  setWindow: (userWindow) ->
    #window
    #range

class ClientContextFactory
  constructor: ->
  createContext: (clientId, userId, callback) ->
    context = new ClientContext(clientId)
    context.setUser(userId, (err) ->
      if(err)
        callback(err)
      else
        callback(null, context)
    )

module.exports = {
  ClientContext,
  ClientContextFactory
}
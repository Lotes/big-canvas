DatabaseConnection = require("./database/DatabaseConnection")
Users = require("./entities/Users")

class ActionState
  constructor: (@startInfo) ->
    @points = []
  addPoint: (point) ->
    @points.push(point)

class ClientContext
  constructor: (@clientId) ->
    @user = null
    @site = null
    @window = null #user window
    @actionState = null
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
  setSite: (@site) ->
  setWindow: (@window) ->
  beginAction: (startInfo) ->
    @actionState = new ActionState(startInfo)
  moveAction: (point) ->
    @actionState.addPoint(point)
  endAction: ->
    @actionState = null

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
  ActionState,
  ClientContext,
  ClientContextFactory
}
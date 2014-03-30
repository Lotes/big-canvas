_ = require("underscore")
{ Point, TileLocation, Site, UserWindow } = require("../BasicTypes")
{ Logger } = require("../logging/Logger")
Backbone = require("backbone")
BigInteger = require("big-integer")
{ ClientContextFactory } = require("./ClientContextFactory")
WindowTree = require("../WindowTree")
Sites = require("./entities/Sites")
Users = require("./entities/Users")
DatabaseConnection = require("./database/DatabaseConnection")

logger = new Logger("AwarenessManager")

class AwarenessManager
  constructor: () ->
    _.extend(this, Backbone.Events)
    @contextFactory = new ClientContextFactory()
    @clientCounter = new BigInteger(0)
    @clients = {}
    @windows = new WindowTree()
  addClient: (userId, callback) ->
    clientId = @clientCounter.toString()
    @clientCounter = @clientCounter.add(1)
    @contextFactory.createContext(clientId, userId, (err, context) =>
      if(err)
        logger.error("incoming connection failed: " + err.message)
        callback(err)
      else
        logger.info("incoming connection " + clientId + " as user " + userId)
        @clients[clientId] = context
        callback(null, clientId)
    )
  removeClient: (clientId, callback) ->
    if(!@clients[clientId]?)
      callback(new Error("Unknown connection "+clientId))
      return
    client = @clients[clientId]
    if(!client.site? || !client.window?)
      callback()
      return
    @windows.remove(clientId)
    site = client.site
    userWindow = client.window
    tileWindow = userWindow.toAbsoluteWindow(site)
    _.each(@windows.getOverlappings(tileWindow), (otherId) =>
      @trigger("windowChanged", otherId, clientId, null)
    )
    delete @clients[clientId]
    logger.info("connection "+clientId+" closed")
    callback()
  _getClient: (callback) ->
    if(!@clients[clientId]?)
      callback(new Error("Unknown connection "+clientId))
    else
      callback(null, clients[clientId])
  _getClientAndSite: (callback) ->
    @_getClient((err, client) ->
      if(err)
        callback(err)
      else
        if(!client.site?)
          callback(new Error("Site missing!"))
        else
          callback(null, client, client.site)
    )
  _getClientSiteAndWindow: (callback) ->
    @_getClientAndSite((err, client, site) ->
      if(err)
        callback(err)
      else
        if(!client.window?)
          callback(new Error("Missing window!"))
        else
          callback(null, client, site, client.window)
    )
  setSite: (clientId, siteId, callback) ->
    @_getClient((err, client) =>
      if(err)
        callback(err)
        return
      logger.info("connection " + clientId + " is trying to set site to '"+siteId+"'")
      connection = new DatabaseConnection()
      connection.connect((err) =>
        if(err)
          callback(err)
          connection.end()
          return
        Sites.get(connection, siteId, (err, mode, column, row) =>
          connection.end()
          if(err)
            callback(err)
            return
          if(client.site != null)
            callback(new Error("Site is already set to '"+client.site.id+"'!"))
            return
          client.setSite(new Site(siteId, mode, new TileLocation(column, row)))
          logger.info("connection " + clientId + " set his site  to '"+siteId+"'")
          callback(null, mode)
        )
      )
    )
  setWindow: (clientId, window, callback) ->
    @_getClientAndSite((err, client, site) =>
      if(err)
        callback(err)
        return
      logger.info("connection " + clientId + " wants to update window")
      #compute tile windows and intersecting clients
      oldUserWindow = client.window
      oldTileWindow = if(oldUserWindow?)then oldUserWindow.toAbsoluteWindow(site) else null
      newUserWindow = new UserWindow(window[0], window[1], window[2], window[3])
      newTileWindow = newUserWindow.toAbsoluteWindow(site)
      oldClientIds = if(oldTileWindow?)then _.without(@windows.getOverlappings(oldTileWindow), clientId) else []
      newClientIds = _.without(@windows.getOverlappings(newTileWindow), clientId)
      #set new window
      client.setWindow(newUserWindow)
      @windows.addOrUpdate(clientId, newTileWindow)
      #notify disappearing clients
      _.each(_.without(oldClientIds, newClientIds), (otherId) =>
        @trigger("windowChanged", otherId, clientId, null)
        @trigger("windowChanged", clientId, otherId, null)
      )
      #notify appearing clients
      _.each(_.without(newClientIds, oldClientIds), (otherId) =>
        other = @clients[otherId]
        otherWindow = other.window
        otherSite = other.site
        @trigger("windowChanged", otherId, clientId, newUserWindow.siteTranslate(site, otherSite).toData())
        @trigger("windowChanged", clientId, otherId, otherWindow.siteTranslate(otherSite, site).toData())
      )
      logger.info("connection " + clientId + " updated window '"+newUserWindow.toString()+"'")
      callback(null)
    )

  beginAction: (clientId, startInfo, callback) -> #TODO
  doActionMove: (clientId, point, callback) -> #TODO
  commitAction: (clientId, callback) -> #TODO
  cancelAction: (clientId, callback) -> #TODO

  resolveClientId: (resolveClientId, callback) ->
    if(!@clients[resolveClientId]?)
      callback(new Error("Unknown connection!"))
    else
      callback(null, @clients[resolveClientId].user.id)
  getUserByUserId: (userId, callback) ->
    connection = new DatabaseConnection()
    connection.connect((err) ->
      if(err)
        callback(err)
      else
        Users.get(connection, userId, (err, user) ->
          connection.end()
          if(err)
            callback(err)
          else
            callback(null, [user.id, user.name, user.defaultColor])
        )
    )

module.exports = AwarenessManager
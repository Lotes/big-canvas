_ = require("underscore")
{ TileLocation, Site } = require("../BasicTypes")
Logger = require("../logging/Logger")
Backbone = require("backbone")
BigInteger = require("big-integer")
#{ SiteType } = require("../rpc/big-canvas")
{ ClientContextFactory } = require("./ClientContextFactory")
WindowTree = require("../WindowTree")
Sites = require("./entities/Sites")
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
    #TODO send windowChanged event to all visible clients
    delete @clients[clientId]
    callback()
  setSite: (clientId, siteId, callback) ->
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
        if(!@clients[clientId]?)
          callback(new Error("Unknown connection "+clientId))
          return
        client = @clients[clientId]
        if(client.site != null)
          callback(new Error("Site is already set to '"+client.site.siteId+"'!"))
          return
        client.setSite(new Site(siteId, mode, new TileLocation(column, row)))
        logger.info("connection " + clientId + " set his site  to '"+siteId+"'")
        callback(null, mode)
      )
    )
  setWindow: (clientId, window) ->
    #check if site is null
    #broadcast window to visible clients

module.exports = AwarenessManager
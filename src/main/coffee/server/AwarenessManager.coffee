_ = require("underscore")
Logger = require("../logging/Logger")
Backbone = require("backbone")
BigInteger = require("big-integer")
{ SiteType } = require("../rpc/big-canvas")
{ ClientContextFactory } = require("./ClientContextFactory")

logger = new Logger("AwarenessManager")

class AwarenessManager
  constructor: () ->
    _.extend(this, Backbone.Events)
    @contextFactory = new ClientContextFactory()
    @clientCounter = new BigInteger(0)
    @clients = {}
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
    logger.info("connection " + clientId + " is trying to set site '"+siteId+"'")
    #TODO send back error or site mode
    callback(null, SiteType.READ_ONLY)
  setWindow: (clientId, window) ->
    #check if site is null
    #broadcast window to visible clients

module.exports = AwarenessManager
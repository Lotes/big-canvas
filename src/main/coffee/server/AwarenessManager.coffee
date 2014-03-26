_ = require("underscore")
{ Point, TileLocation, Site, UserWindow } = require("../BasicTypes")
{ Logger } = require("../logging/Logger")
Backbone = require("backbone")
BigInteger = require("big-integer")
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
    if(!@clients[clientId]?)
      callback(new Error("Unknown connection "+clientId))
      return
    client = @clients[clientId]
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
          callback(new Error("Site is already set to '"+client.site.siteId+"'!"))
          return
        client.setSite(new Site(siteId, mode, new TileLocation(column, row)))
        logger.info("connection " + clientId + " set his site  to '"+siteId+"'")
        callback(null, mode)
      )
    )
  setWindow: (clientId, window, callback) ->
    if(!@clients[clientId]?)
      callback(new Error("Unknown connection "+clientId))
      return
    client = @clients[clientId]
    if(!client.site?)
      callback(new Error("Site missing!"))
      return
    location = client.site.location
    userWindow = new UserWindow(window[0], window[1], window[2], window[3])
    logger.info("connection " + clientId + " wants to update window")
    client.setWindow(userWindow)
    tileWindow = userWindow.toAbsoluteWindow(client.site)
    @windows.addOrUpdate(clientId, tileWindow)
    #TODO send also null windows back to non-intersecting clients when no more intersecting
    intersectingClientIds = _.without(@windows.getOverlappings(tileWindow), clientId)
    _.each(intersectingClientIds, (intersectingClientId) =>
      if(!@clients[intersectingClientId]? || @clients[intersectingClientId].site == null)
        return
      intersectingSiteLocation = @clients[intersectingClientId].site.location
      pt = Point.createFromDifferentSite(new Point(window[0], window[1]), location, intersectingSiteLocation).toData()
      changedWindow = [pt[0], pt[1], window[2], window[3]]
      @trigger("windowChanged", intersectingClientId, clientId, changedWindow)
      #TODO send also the intersecting windows to the client
    )
    logger.info("connection " + clientId + " updated window '"+userWindow.toString()+"'")
    callback(null)

module.exports = AwarenessManager
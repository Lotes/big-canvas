_ = require("underscore")
Backbone = require("backbone")
config = require("../Config")
BigInteger = require("big-integer")
{ MainWorker, SiteType } = require("../rpc/big-canvas")
{ Logger } = require("../logging/Logger")
MainClientStub = MainWorker.ClientStub

logger = new Logger("Client")

class Client
  constructor: (siteId) ->
    _.extend(this, Backbone.Events)
    socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
    socket = new WebSocket(socketUrl)
    socket.onopen = ->
      logger.info("Socket opened!")
    socket.onerror = ->
      logger.info("Socket error!")
    socket.onclose = ->
      logger.info("Socket closed!")
    socket.onmessage = (msg) ->
      logger.info("incoming message: "+msg.data)
      mainInterface.receive(JSON.parse(msg.data))
    mainInterface = new MainClientStub({
      send: (object) ->
        message = JSON.stringify(object)
        logger.info("outgoing message: "+message)
        socket.send(message)
      initialized: (clientId, userId) =>
        @clientId = clientId
        @userId = userId
        mainInterface.setSite(siteId, (err, mode) =>
          if(err)
            logger.error("Could not set site: "+err.message)
            socket.close()
            return
          @readOnly = mode == SiteType.READ_ONLY
          @trigger("initialized")
        )
      windowChanged: (clientId, window) ->
    })

module.exports = { Client }

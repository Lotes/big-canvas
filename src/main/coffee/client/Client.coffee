_ = require("underscore")
Backbone = require("backbone")
config = require("../Config")
BigInteger = require("big-integer")
{ MainWorker, SiteType } = require("../rpc/big-canvas")
{ Logger } = require("../logging/Logger")
{ UserWindow } = require("../BasicTypes")
MainClientStub = MainWorker.ClientStub

logger = new Logger("Client")

class Client extends MainClientStub
  constructor: (siteId) ->
    super({
      send: (object) ->
        message = JSON.stringify(object)
        logger.info("outgoing message: "+message)
        socket.send(message)
      initialized: (clientId, userId) =>
        @setSite(siteId, (err, mode) =>
          if(err)
            logger.error("Could not set site: "+err.message)
            socket.close()
            return
          readOnly = mode == SiteType.READ_ONLY
          @trigger("initialized", clientId, userId, readOnly)
        )
      windowChanged: (clientId, window) ->
        @trigger("windowChanged", clientId, new UserWindow(window[0], window[1], window[2], window[3]))
      onAnnotationsChanged: (annotationIds) ->
        @trigger("annotationChanged", annotationIds)
    })
    _.extend(this, Backbone.Events)
    socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
    socket = new WebSocket(socketUrl)
    socket.onopen = ->
      logger.info("Socket opened!")
    socket.onerror = ->
      logger.info("Socket error!")
    socket.onclose = ->
      logger.info("Socket closed!")
    socket.onmessage = (msg) =>
      logger.info("incoming message: "+msg.data)
      @receive(JSON.parse(msg.data))

module.exports = { Client }

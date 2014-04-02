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

          mainInterface.setWindow(["-1000", "-1000", 2000, 2000], (err) ->
            if(err)
              log.error("Could not set window: "+err.message)
            else
              logger.debug("window set!")
          )
        )
      windowChanged: (clientId, window) ->
        logger.debug("window changed: "+JSON.stringify(window))
      onAnnotationsChanged: (annotationIds) ->
        logger.debug("annotations changed: "+JSON.stringify(annotationIds))
        ###
        for annotationId in annotationIds
          mainInterface.getAnnotation(annotationId, (err, annotation) =>
            if(err)
              logger.error("Could not get annotation: "+err.message)
            else
              logger.debug("Annotation loaded: "+JSON.stringify(annotation))
              for postId in annotation.posts
                mainInterface.getPost(postId, (err, post) =>
                  if(err)
                    logger.error("Could not get post: "+err.message)
                  else
                    logger.debug("Post loaded: "+JSON.stringify(post))
                )
          )
        ###
      onPostChanged: (annotationId, postId) ->
        logger.debug("post changed: "+annotationId+"."+postId)
    })

module.exports = { Client }

config = require("../Config")
BigInteger = require("big-integer")
{ MainWorker, SiteType } = require("../rpc/big-canvas")
{ Logger } = require("../logging/Logger")
ConsoleAppender = require("../logging/ConsoleAppender")
MainClientStub = MainWorker.ClientStub

Logger.addAppender(new ConsoleAppender())
logger = new Logger("main")

socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
socket = new WebSocket(socketUrl)
socket.onopen = () ->
  logger.info("WebSocket opened!")
socket.onerror = () ->
  logger.info("WebSocket error!")
socket.onclose = () ->
  logger.info("WebSocket closed!")
socket.onmessage = (msg) ->
  mainInterface.receive(JSON.parse(msg.data))

mainInterface = new MainClientStub({
  send: (object) ->
    socket.send(JSON.stringify(object))
  initialized: (clientId, userId) ->
    mainInterface.getUserByUserId(userId, (err, user) ->
      if(err)
        logger.error(err.message)
      else
        logger.info("I am client "+clientId+" as user '"+user[1]+"'")
    )
    #siteId = "null" #is set by the template
    logger.info("Setting site to '"+siteId+"'")
    mainInterface.setSite(siteId, (err, mode) =>
      if(err)
        logger.error(err.message)
        return
      mode = if(mode==SiteType.READ_ONLY)then "READ ONLY" else "WRITABLE"
      logger.info("Site mode is "+mode)
      mainInterface.setWindow(["-10", "-10", 300, 300], (err) =>
        if(err)
          logger.error(err.message)
        else
          logger.info("Successfully set user window.")
      )
    )
  windowChanged: (clientId, window) ->
    if(window == null)
      logger.info("removing user window of client "+clientId)
    else
      mainInterface.resolveClientId(clientId, (err, userId) ->
        if(err)
          logger.error(err.message)
        else
          mainInterface.getUserByUserId(userId, (err, user) ->
            if(err)
              logger.error(err.message)
            else
              logger.info("incoming user window of client "+clientId+" as user '"+user[1]+"': "+JSON.stringify(window))
          )
      )
})
{ Logger } = require("../logging/Logger")
BigInteger = require("big-integer")
AwarenessManager = require("./AwarenessManager")
{ MainWorker } = require("../rpc/big-canvas")
MainServerStub = MainWorker.ServerStub
DatabaseConnection = require("./database/DatabaseConnection")
Sites = require("./entities/Sites")

logger = new Logger("MainThread")

class MainThread
  constructor: (@app, @socketToUserId, @socketServer) ->
    socketsByClientId = {}
    awarenessManager = new AwarenessManager()

    logger.info("initialize web interface")
    @app.get("/sites/:id", (req, res, next) ->
      siteId = req.params.id
      connection = new DatabaseConnection()
      connection.connect((err) ->
        if(err)
          next(err)
        else
          Sites.get(connection, siteId, (err, site) ->
            if(err)
              next(err)
            else
              res.render("site.ejs", {siteId: siteId })
          )
      )
    )

    logger.info("initialize main worker server stub")
    mainInterface = new MainServerStub({
      send: (clientId, object) ->
        if(socketsByClientId[clientId]?)
          message = JSON.stringify(object)
          logger.info("outgoing message to connection " + clientId + ": "+message)
          socketsByClientId[clientId].send(message)
      setSite: (clientId, siteId, callback) =>
        awarenessManager.setSite(clientId, siteId, callback)
      setWindow: (clientId, window, callback) ->
        awarenessManager.setWindow(clientId, window, callback)

      beginAction: (clientId, startInfo, callback) ->
        awarenessManager.beginAction(clientId, startInfo, callback)
      doActionMove: (clientId, point, callback) ->
        awarenessManager.doActionMove(clientId, point, callback)
      commitAction: (clientId, callback) ->
        awarenessManager.commitAction(clientId, callback)
      cancelAction: (clientId, callback) ->
        awarenessManager.cancelAction(clientId, callback)

      getAnnotation: (clientId, annotationId, callback) ->
        awarenessManager.getAnnotation(clientId, annotationId, callback)
      getPost: (clientId, postId, callback) ->
        awarenessManager.getPost(clientId, postId, callback)
      createAnnotation: (clientId, position, title, text, callback) ->
        awarenessManager.createAnnotation(clientId, position, title, text, callback)
      replyAnnotation: (clientId, annotationId, text, callback) ->
        awarenessManager.replyAnnotation(clientId, annotationId, text, callback)
      openAnnotation: (clientId, annotationId, callback) ->
        awarenessManager.openAnnotation(clientId, annotationId, callback)
      closeAnnotation: (clientId, annotationId, callback) ->
        awarenessManager.closeAnnotation(clientId, annotationId, callback)

      resolveClientId: (clientId, resolveClientId, callback) ->
        awarenessManager.resolveClientId(resolveClientId, callback)
      getUserByUserId: (clientId, userId, callback) ->
        awarenessManager.getUserByUserId(userId, callback)
    })

    logger.info("initialize awareness manager")
    awarenessManager.on("windowChanged", (receivingClientId, clientId, window) =>
      mainInterface.windowChanged(receivingClientId, clientId, window)
    )
    awarenessManager.on("annotationsChanged", (clientId, annotationIds) =>
      mainInterface.onAnnotationsChanged(clientId, annotationIds)
    )

    logger.info("initialize socket server")
    @socketServer.on("connection", (socket) =>
      @socketToUserId(socket, (err, userId) =>
        if(err)
          socket.close()
          return
        awarenessManager.addClient(userId, (err, clientId) =>
          if(err)
            socket.close()
            return
          #set socket
          socketsByClientId[clientId] = socket
          mainInterface.initialized(clientId, clientId, userId)
          #receiving message
          socket.on("message", (message) =>
            logger.info("incoming message from connection " + clientId + ": "+message)
            mainInterface.receive(clientId, JSON.parse(message))
          )
          #closing connection
          socket.on("close", ->
            delete socketsByClientId[clientId]
            awarenessManager.removeClient(clientId, (err) -> )
          )
        )
      )
    )

module.exports = MainThread
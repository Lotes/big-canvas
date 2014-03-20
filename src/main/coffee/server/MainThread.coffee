Logger = require("../logging/Logger")
BigInteger = require("big-integer")
AwarenessManager = require("./AwarenessManager")
{ MainWorker } = require("../rpc/big-canvas")
MainServerStub = MainWorker.ServerStub

logger = new Logger("MainThread")

class MainThread
  constructor: (@app, @socketToUserId, @socketServer) ->
    socketsByClientId = {}
    awarenessManager = new AwarenessManager()

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
    })

    logger.info("initialize awareness manager")

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
            logger.info("closing connection " + clientId)
            delete socketsByClientId[clientId]
            awarenessManager.removeClient(clientId, (err) -> )
          )
        )
      )
    )

module.exports = MainThread
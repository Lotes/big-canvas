Logger = require("../logging/Logger")
BigInteger = require("big-integer")
{ MainWorker } = require("../rpc/big-canvas")
MainServerStub = MainWorker.ServerStub

logger = new Logger("MainThread")

class MainThread
  constructor: (@app, @socketToUserId, @socketServer) ->
    socketsByClientId = {}
    clientCounter = new BigInteger(0);
    logger.info("initialize main worker server stub")
    mainInterface = new MainServerStub({
      send: (clientId, object) ->
        if(socketsByClientId[clientId]?)
          message = JSON.stringify(object)
          logger.info("outgoing message to connection " + clientId + ": "+message)
          socketsByClientId[clientId].send(message)
      login: (clientId, siteId, callback) ->
        logger.info("connection " + clientId + " is trying to login at site '"+siteId+"'")
        callback(null, 0)
      setWindow: (clientId, window, callback) ->
    })
    logger.info("initialize socket server")
    @socketServer.on("connection", (socket) =>
      @socketToUserId(socket, (err, userId) =>
        if(err)
          socket.close()
          return
        #assign client id
        clientId = clientCounter.toString()
        clientCounter = clientCounter.add(1)
        logger.info("incoming connection " + clientId + " as user " + userId)
        #save socket information
        socketsByClientId[clientId] = socket
        #receiving message
        socket.on("message", (message) =>
          logger.info("incoming message from connection " + clientId + ": "+message)
          mainInterface.receive(clientId, JSON.parse(message))
        )
        #closing connection
        socket.on("close", ->
          logger.info("closing connection " + clientId)
          delete socketsByClientId[clientId]
        )
      )
    )

module.exports = MainThread
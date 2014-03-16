Logger = require("../logging/Logger")
BigInteger = require("big-integer")
{ MainWorker } = require("../rpc/big-canvas")

logger = new Logger("MainThread")

class MainThread
  constructor: (@app, @socketServer) ->
    @setupSocketServer()
  setupSocketServer: ->
    logger.info("initialize socket server")
    @socketServer.on("connection", (socket) ->
      socket.on("message", (message) ->
        socket.send("PUNK!")
      )
      socket.on("close", ->

      )
    )

module.exports = MainThread
{ AwarenessWorker } = require("../../rpc/big-canvas")
ServerStub = AwarenessWorker.ServerStub

server = new ServerStub({
  send: (socketId, object) ->
    process.send(object)
  login: (socketId, clientId, userId, siteType, siteId, callback) ->
    #console.log("client "+clientId+" as user "+userId+" logged in at site "+siteId)
    callback()
  logout: (socketId, clientId, callback) ->
    #console.log("client "+clientId+" logged out")
    callback()
})

process.on('message', (message) ->
  server.receive(0, message)
)
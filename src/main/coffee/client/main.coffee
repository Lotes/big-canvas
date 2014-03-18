config = require("../Config")
BigInteger = require("big-integer")
{ MainWorker } = require("../rpc/big-canvas")
MainClientStub = MainWorker.ClientStub

socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
socket = new WebSocket(socketUrl)
socket.onopen = () ->
  mainInterface.login("bla", (err, siteType) ->
    if(err)
      console.log(err.message)
      return
    console.log("siteType: "+siteType)
  )
socket.onerror = () ->
  console.log("WebSocket error!")
socket.onclose = () ->
  console.log("WebSocket closed!")
socket.onmessage = (msg) ->
  mainInterface.receive(JSON.parse(msg.data))

mainInterface = new MainClientStub({
  send: (object) ->
    socket.send(JSON.stringify(object))
  windowChanged: (clientId, window) ->
})
config = require("../Config")
BigInteger = require("big-integer")
{ MainWorker, SiteType } = require("../rpc/big-canvas")
MainClientStub = MainWorker.ClientStub

socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
socket = new WebSocket(socketUrl)
socket.onopen = () ->
  console.log("WebSocket opened!")
socket.onerror = () ->
  console.log("WebSocket error!")
socket.onclose = () ->
  console.log("WebSocket closed!")
socket.onmessage = (msg) ->
  mainInterface.receive(JSON.parse(msg.data))

mainInterface = new MainClientStub({
  send: (object) ->
    socket.send(JSON.stringify(object))
  initialized: (clientId, userId) ->
    console.log("I am client "+clientId+" as user "+userId)
    siteId = "null"
    console.log("Setting site to '"+siteId+"'")
    mainInterface.setSite(siteId, (err, mode) =>
      if(err)
        console.log("Error: "+err.message)
        return
      mode = if(mode==SiteType.READ_ONLY)then "READ ONLY" else "WRITABLE"
      console.log("Site mode is "+mode)
    )
  windowChanged: (clientId, window) ->
})
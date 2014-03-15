config = require("../Config")

socketUrl = "ws://"+document.location.hostname+":"+config.SERVER_WEB_PORT+"/"+config.SERVER_SOCKET_PATH
socket = new WebSocket(socketUrl)
socket.onopen = () ->
  socket.send("test")
socket.onerror = () ->
  console.log("WebSocket error!")
socket.onclose = () ->
  console.log("WebSocket closed!")
socket.onmessage = (msg) ->
  console.log(msg.data)
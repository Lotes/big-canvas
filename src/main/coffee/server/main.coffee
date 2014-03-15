config = require("./Config")
express = require("express")
http = require("http")
WebSocketServer = require('ws').Server

app = express()
app.configure(() ->
  app.set("views", null) #config.SERVER_VIEW_PATH
  app.set("view engine", "ejs")
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(config.SERVER_WEB_PATH))
)

app.configure('development', () ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
)
app.configure('production', () ->
  app.use(express.errorHandler())
)

webServer = http.createServer(app)
webServer.listen(config.SERVER_WEB_PORT)

socketServer = new WebSocketServer({
  server: webServer,
  path: "/"+config.SERVER_SOCKET_PATH
})

socketServer.on("connection", (socket) ->
  socket.on("message", (message) ->
    socket.send(message+" PUNK!")
  )
)
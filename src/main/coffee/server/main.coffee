config = require("./Config")
express = require("express")
MemoryStore = express.session.MemoryStore
http = require("http")
WebSocketServer = require('ws').Server
MainThread = require("./MainThread")
signature = require('cookie-signature')

sessionStore = new MemoryStore()
parseCookie = express.cookieParser()

app = express()
app.configure(() ->
  app.set("views", null) #config.SERVER_VIEW_PATH
  app.set("view engine", "ejs")
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(parseCookie)
  app.use(express.session({
    secret: config.SERVER_SESSION_SECRET,
    key: config.SERVER_SESSION_ID,
    store: sessionStore
  }))
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

socketToUserId = (socket, callback) ->
  parseCookie(socket.upgradeReq, null, (err) ->
    if(err)
      callback(null, config.DEMO_USER_ID)
      return
    sessionID = socket.upgradeReq.cookies[config.SERVER_SESSION_ID]
    sessionID = signature.unsign(sessionID.slice(2), config.SERVER_SESSION_SECRET)
    sessionStore.get(sessionID, (err, session) ->
      if(err || !session || !session.userId)
        callback(null, config.DEMO_USER_ID)
      else
        callback(null, session.userId)
    )
  )

new MainThread(app, socketToUserId, socketServer)
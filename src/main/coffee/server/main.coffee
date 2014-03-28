config = require("./Config")
{ Logger } = require("../logging/Logger")
FileAppender = require("../logging/FileAppender")
ConsoleAppender = require("../logging/ConsoleAppender")
express = require("express")
MemoryStore = express.session.MemoryStore
http = require("http")
WebSocketServer = require("ws").Server
MainThread = require("./MainThread")
signature = require("cookie-signature")
Users = require("./entities/Users")
passport = require("passport")
GoogleStrategy = require("passport-google").Strategy
DatabaseConnection = require("./database/DatabaseConnection")
lock = require("./lock")

Logger.addAppender(new ConsoleAppender())
Logger.addAppender(new FileAppender())

passport.use(new GoogleStrategy({
    returnURL: "http://"+config.SERVER_WEB_ADDRESS+"/auth/google/return",
    realm: "http://"+config.SERVER_WEB_ADDRESS+"/"
  },
  (identifier, profile, callback) ->
    lock("users", (done) ->
      connection = new DatabaseConnection()
      connection.connect((err) ->
        if(err)
          callback(err)
          done()
        else
          Users.findAndUpdateGoogle(connection, identifier, profile.displayName, (err, userId) ->
            connection.end()
            if(err)
              callback(err)
            else
              callback(null, userId)
            done()
          )
      )
    )
))
passport.serializeUser((user, done) ->
  done(null, user)
)
passport.deserializeUser((user, done) ->
  done(null, user)
)

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
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(app.router)
  app.use(express.static(config.SERVER_WEB_PATH))
)

app.configure('development', () ->
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
)
app.configure('production', () ->
  app.use(express.errorHandler())
)

app.get("/auth/google", passport.authenticate("google"))
app.get("/auth/google/return",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login.html"
  })
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
    sessionId = socket.upgradeReq.cookies[config.SERVER_SESSION_ID]
    sessionId = signature.unsign(sessionId.slice(2), config.SERVER_SESSION_SECRET)
    sessionStore.get(sessionId, (err, session) ->
      if(err || !session || !session.passport || !session.passport.user)
        callback(null, config.DEMO_USER_ID)
      else
        callback(null, session.passport.user)
    )
  )

new MainThread(app, socketToUserId, socketServer)
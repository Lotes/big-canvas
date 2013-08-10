var config = require("./Config");
var express = require("express");
var SessionStore = require("./SessionStore")(express);
var WebSocketServer = require('ws').Server;
var Users = require("./data/Users");
var NameGenerator = require("./NameGenerator");
var signature = require('cookie-signature');
var BigCanvas = require("./BigCanvas").BigCanvas;
var BigCanvasSocket = require("./BigCanvas").BigCanvasSocket;
var bigCanvas = new BigCanvas();

var webServer = express();
var sessionStore = new SessionStore({
  path: config.SERVER_SESSIONS_PATH
});
var parseCookie = express.cookieParser();

webServer.configure(function(){
  webServer.set('views', config.SERVER_VIEW_PATH);
  webServer.set('view engine', 'ejs');
  //webServer.use(express.logger('dev'))
  //webServer.set('view options', {layout: false});
  webServer.use(express.bodyParser());
  webServer.use(express.methodOverride());
  webServer.use(parseCookie);
  webServer.use(express.session({
    secret: config.SERVER_SESSION_SECRET,
    key: config.SERVER_SESSION_ID,
    store: sessionStore
  }));
  webServer.use(webServer.router);
  webServer.use(function(req, res, next) {
    if(!req.session.userId) {
      Users.create(function(err, uid) {
        if(!err)
          req.session.userId = uid;
        else
          req.session.userId = -1;
        next();
      });
    } else
      next();
  });
  webServer.use(express.static(config.SERVER_WEB_PATH));
});

webServer.configure('development', function(){
  webServer.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

webServer.configure('production', function(){
  webServer.use(express.errorHandler());
});

webServer.get('/tiles/:x_:y.png', function(req, res){
  //TODO
  res.end("nothing");
});

webServer.get('/images/:id.png', function(req, res){
  //TODO
  res.end("nothing");
});

webServer.listen(config.SERVER_WEB_PORT);

var socketServer = new WebSocketServer({
  port: config.SERVER_SOCKET_PORT,
  path: "/"+config.SERVER_SOCKET_PATH
});
socketServer.on('connection', function(socket) {
  parseCookie(socket.upgradeReq, null, function(err) {
    if(err)
      throw err;
    //cookie decoding see at connect/utils
    var sessionID = socket.upgradeReq.cookies[config.SERVER_SESSION_ID];
    sessionID = signature.unsign(sessionID.slice(2), config.SERVER_SESSION_SECRET);
    sessionStore.get(sessionID, function(err, session) {
      if(err || !session || !session.userId) {
        socket.close();
        return;
      }
      //initialize connection
      var extSocket = new BigCanvasSocket(socket, session.userId);
      bigCanvas.Server.connect(extSocket);
      //receiving messages
      socket.on("message", function(message) {
        try {
          bigCanvas.Server.receive(extSocket, JSON.parse(message));
        } catch(ex) {
          console.log("Error while receiving: "+ex.message);
          socket.close();
        }
      });
      //finalize connection
      socket.on("close", function() {
        bigCanvas.Server.disconnect(extSocket);
      });
    });
  });
});
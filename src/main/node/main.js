var config = require("./Config");
var express = require("express");
var SessionStore = require("./SessionStore")(express);
var WebSocketServer = require('ws').Server;
var UserStore = require("./UserStore");
var NameGenerator = require("./NameGenerator");
var signature = require('cookie-signature');

var webServer = express();
var sessionStore = new SessionStore({
    path: config.SERVER_SESSIONS_PATH
});
var userStore = new UserStore({
    path: config.SERVER_USERS_PATH
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
            userStore.create({
                name: NameGenerator.generate()
            }, function(err, uid) {
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
});

webServer.listen(config.SERVER_WEB_PORT);

var socketIds = 0;
var sockets = {};
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
            if(err)
                throw err;
            if(!session.userId)
                throw new Error("The session '"+sessionID+"' has no user id.");

            //initialize socket associated data
            var socketId = socketIds++;
            sockets[socketId] = {
                socket: socket,
                userId: session.userId,
                window: null
            };

            socket.on("message", function(message) {

            });

            socket.on("close", function() {
                delete sockets[socketId];
            });
        });
    });
});
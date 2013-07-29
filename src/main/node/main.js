var config = require("./Config");
var express = require("express");

var server = express();

server.configure(function(){
    server.set('views', config.SERVER_VIEW_PATH);
    server.set('view engine', 'ejs');
    server.set('view options', {layout: false});
    server.use(express.bodyParser());
    server.use(express.methodOverride());
    server.use(express.cookieParser());
    server.use(express.session({
        secret: config.SERVER_SESSION_SECRET
    }));
    server.use(server.router);
    server.use(express.static(config.SERVER_WEB_PATH));
});

server.configure('development', function(){
    server.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

server.configure('production', function(){
    server.use(express.errorHandler());
});

server.get('/', function(req, res){
    req.session.user = {
        name: "quark"
    };
    res.render('index', {});
});

/*server.post('/login', function(req, res){
    //login and redirect to index
    data.users.findByName(req.body.username)
        .success(function(user) {
            if(user && user.password == req.body.password) {
                //successful login
                data.sessions.add(req.sessionID, user.id);
                req.session.user = {
                    id: user.id,
                    name: user.name
                };
                res.redirect("/");
            } else {
                res.render('login', {
                    title:'Login',
                    error:"Invalid login!"
                });
            }
        })
        .error(function(err) {
            res.render('login', {
                title: 'Login',
                error: err.message
            });
        });
});

server.get('/logout', function(req, res){
    //logout and redirect to index
    data.sessions.remove(req.sessionID);
    req.session.destroy();
    res.redirect("/");
});

server.get("/", function(req, res){
    if(!req.session.user) {
        res.render("index", {
            title: "Welcome"
        });
    } else {
        data.pads.findAllByUserId(req.session.user.id)
            .success(function(pads) {
                res.redirect("/editor/1"); //TODO
                res.render("index", {
                 title: "Welcome",
                 images: pads
                 });
            })
            .error(function(err) {
                res.render("index", {
                    title: "Welcome",
                    error: err
                });
            });
    }
});

server.get('/editor/:id', function(req, res){
    //show editor for given image id
    res.render("editor", {
        title: "Editor",
        padId: req.params.id,
        sessionId: req.sessionID
    });
});              */

server.listen(config.SERVER_PORT);
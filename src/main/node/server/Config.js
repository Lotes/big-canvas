//server configuration
var Config = require("../Config");

Config.SERVER_WEB_PORT = 8080;
Config.SERVER_WEB_PATH = __dirname + "/../../../../public";
Config.SERVER_VIEW_PATH = __dirname + "/../../../../private/views";
Config.SERVER_USERS_PATH = __dirname + "/../../../../private/users";
Config.SERVER_SESSION_SECRET = "keyboard cat";
Config.SERVER_SESSION_ID = "SESSION_ID";

Config.ACTION_MAX_STROKE_SIZE = 4096;

module.exports = Config;
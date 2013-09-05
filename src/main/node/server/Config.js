/**
 * @class Config
 */
var Config = require("../Config");

Config.DATABASE_HOST = "localhost";
Config.DATABASE_USERNAME = "root";
Config.DATABASE_PASSWORD = "";
Config.DATABASE_NAME = "bigcanvas";

/**
 * the port of the web server
 * @property SERVER_WEB_PORT
 * @type Integer
 * @default 8080
 */
Config.SERVER_WEB_PORT = 8080;

/**
 * the path of the web server
 * @property SERVER_WEB_PATH
 * @type String
 * @default "/public"
 */
Config.SERVER_WEB_PATH = __dirname + "/../../../../public";
Config.SERVER_VIEW_PATH = __dirname + "/../../../../private/views";
Config.SERVER_TILES_PATH = __dirname + "/../../../../private/tiles";
Config.SERVER_SESSION_SECRET = "keyboard cat";
Config.SERVER_SESSION_ID = "SESSION_ID";

Config.ACTION_MAX_STROKE_SIZE = 4096;

module.exports = Config;
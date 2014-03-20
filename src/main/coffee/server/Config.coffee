###
* Global configuration
* @class Config
###
Config = require("../Config")

Config.DATABASE_HOST = "localhost"
Config.DATABASE_USERNAME = "root"
Config.DATABASE_PASSWORD = "root"
Config.DATABASE_NAME = "bigcanvas"

###
* the path of the web server
* @property SERVER_WEB_PATH
* @type String
* @default "/public"
###
Config.SERVER_WEB_PATH = __dirname + "/../../../../public2"
Config.SERVER_VIEW_PATH = __dirname + "/../../../../private/views"
Config.SERVER_TILES_PATH = __dirname + "/../../../../private/tiles"
Config.SERVER_LOGS_PATH = __dirname + "/../../../../private/logs"
Config.SERVER_SESSION_SECRET = "keyboard cat"
Config.SERVER_SESSION_ID = "SESSION_ID"

Config.ACTION_MAX_STROKE_SIZE = 4096

#default values; see users table in schema.sql
Config.DEMO_USER_ID = "0"
Config.DEMO_SITE = "null"

module.exports = Config
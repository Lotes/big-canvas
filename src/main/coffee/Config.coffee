#common configuration file
Config = {}

###
* the port of the web server
* @property SERVER_WEB_PORT
* @type Integer
* @default 8080
###
Config.SERVER_WEB_PORT = 8080

###
* the path of the web socket
* @property SERVER_SOCKET_PATH
* @type String
* @default "big-canvas"
###
Config.SERVER_SOCKET_PATH = "big-canvas"

###
* the width and height of a tile
* @property TILE_SIZE
* @type Integer
* @default 128
###
Config.TILE_SIZE = 128

module.exports = Config
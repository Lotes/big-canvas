//common configuration file
/**
 * @class Config
 */
var Config = {
  /**
   * the port of the web socket
   * @property SERVER_SOCKET_PORT
   * @type Integer
   * @default 8081
   */
  SERVER_SOCKET_PORT: 8081,
  /**
   * the path of the web socket
   * @property SERVER_SOCKET_PATH
   * @type String
   * @default "big-canvas"
   */
  SERVER_SOCKET_PATH: "big-canvas",
  /**
   * the width and height of a tile
   * @property TILE_SIZE
   * @type Integer
   * @default 128
   */
  TILE_SIZE: 128
};

module.exports = Config;
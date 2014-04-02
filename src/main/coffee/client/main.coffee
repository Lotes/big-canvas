#config = require("../Config")
{ Logger } = require("../logging/Logger")
ConsoleAppender = require("../logging/ConsoleAppender")
{ Client } = require("./Client")

Logger.addAppender(new ConsoleAppender())
logger = new Logger("main")

client = new Client(siteId) #siteId will be set by the template
client.on("initialized", ->
  logger.info("initialized")
)
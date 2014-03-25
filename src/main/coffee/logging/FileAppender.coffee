config = require("../Config")
{ LogAppender } = require("./Logger")
fs = require("fs")

class FileAppender extends LogAppender
  constructor: (fileName) ->
    fileName = fileName || "main.log"
    logFileName = config.SERVER_LOGS_PATH + "/" + fileName
    @stream = fs.createWriteStream(logFileName, {
      flags: 'w',
      encoding: "utf8",
      mode: 0o777
    })
  append: (source, level, timestamp, message, annotations) ->
    try
      record = {
        source: source,
        level: level,
        message: message,
        timestamp: timestamp.toJSON(),
        annotations: annotations
      }
      line = JSON.stringify(record)+"\n"
      @stream.write(line)
    catch ex
      console.log("Error while logging: "+ex.message)

module.exports = FileAppender
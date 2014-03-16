config = require("../Config")
fs = require("fs")

logFileName = config.SERVER_LOGS_PATH + "/main.log" #TODO derive a name from date time
stream = fs.createWriteStream(logFileName, {
  flags: 'w',
  encoding: "utf8",
  mode: 0o777
})

log = (source, level, timestamp, message, annotations) ->
  try
    record = {
      source: source,
      level: level,
      message: message,
      timestamp: timestamp.toJSON(),
      annotations: annotations
    }
    line = JSON.stringify(record)+"\n"
    stream.write(line)
    console.log("["+timestamp.toJSON()+"] ["+source+"] "+level+": "+message)
  catch ex
    console.log("Error while logging: "+ex.message)

class Logger
  constructor: (@source, @defaultAnnotations) ->
    @source = @source || "<not source>"
    @defaultAnnotations = @defaultAnnotations || {}
  createChild: (annotations) ->
    annos = {}
    for k, v of @defaultAnnotations
      annos[k] = v
    for k, v of @annotations
      annos[k] = v
    new Logger(@source, annos)
  log: (level, message, annotations) ->
    annos = {}
    for k, v of @defaultAnnotations
      annos[k] = v
    for k, v of @annotations
      annos[k] = v
    log(@source, level, new Date(), message, annos)
  info: (message, annotations) -> @log("INFO", message, annotations)
  debug: (message, annotations) -> @log("DEBUG", message, annotations)
  warn: (message, annotations) -> @log("WARNING", message, annotations)
  error: (message, annotations) -> @log("ERROR", message, annotations)
  fatal: (message, annotations) -> @log("FATAL", message, annotations)

module.exports = Logger
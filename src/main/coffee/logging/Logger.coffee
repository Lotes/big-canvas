config = require("../Config")

appenders = []

log = (source, level, timestamp, message, annotations) ->
  for appender in appenders
    appender.append(source, level, timestamp, message, annotations)

class LogAppender
  constructor: ->
  append: (source, level, timestamp, message, annotations) ->

class Logger
  @addAppender: (appender) ->
    appenders.push(appender)
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

module.exports = { Logger, LogAppender }
config = require("../Config")
{ LogAppender } = require("./Logger")

class ConsoleAppender extends LogAppender
  constructor: ->
  append: (source, level, timestamp, message, annotations) ->
    console.log("["+timestamp.toJSON()+"] ["+source+"] "+level+": "+message)

module.exports = ConsoleAppender
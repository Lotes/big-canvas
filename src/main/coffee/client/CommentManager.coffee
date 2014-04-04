{ Logger } = require("../logging/Logger")
{ Annotation, AnnotationCollection, Post, PostCollection } = require("./models")

logger = new Logger("CommentManager")

class CommentManager
  constructor: (@client) ->
#TODO

module.exports = { CommentManager }
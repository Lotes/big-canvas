Backbone = require("backbone")
{ Logger } = require("../logging/Logger")
{ Point } = require("../BasicTypes")

logger = new Logger("Models")

class User extends Backbone.Model
  defaults: {
    id: null,
    name: "[no user]",
    color: "#FF0000"
  }
dummyUser = new User({ id: "-1" })

class UserCollection extends Backbone.Collection
  model: User

class Post extends Backbone.Model
  defaults: {
    id: null,
    author: dummyUser,
    createdAt: new Date(),
    likingUsers: new UserCollection()
  }
dummyPost = new Post({ id: "-1" })

class PostCollection extends Backbone.Collection
  model: Post

class Annotation extends Backbone.Model
  defaults: {
    id: null,
    title: "[untitled]",
    position: new Point(0, 0),
    author: dummyUser,
    read: false,
    createdAt: new Date()
    posts: new PostCollection()
  }
dummyAnnotation = new Annotation({ id: "-1" })

class AnnotationCollection extends Backbone.Collection
  model: Annotation
  comparator: (model) -> return -model.get("createdAt").getTime()

module.exports = {
  Annotation, AnnotationCollection,
  Post, PostCollection,
  User, UserCollection
}

###
class ToolOption
  constructor: (@name, @defaultValue) ->

class Tool
  constructor: (@name, @pictureClass)->
    #editor mode
    #onStart, onMove, onEnd
    #options
  start: (position) -> logger.debug("Unimplemented method '"+@name+".start(...)'")
  move: (position) -> logger.debug("Unimplemented method '"+@name+".move(...)'")
  end: (position) -> logger.debug("Unimplemented method '"+@name+".end(...)'")

class MoveTool extends Tool
  constructor: ->
    super("Move", "tool-move")

class BrushTool extends Tool
  constructor: ->
    super("Brush", "tool-brush")

class EraserTool extends Tool
  constructor: ->
    super("Eraser", "tool-eraser")

EditorMode = {
  MOVE: 0,
  BRUSH: 1
}

class Layer
  constructor: ->
  setVisible: (visible) ->
  setLock: (locked) ->

class Editor
  constructor: (divContainer, readOnly) ->
    #register onmouse- and ontouch-events
    #register shortcuts
  setMode: (mode) -> #or set tool?
  selectLayer: (index) ->
  resize: ->
###
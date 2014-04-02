Backbone = require("backbone")
{ Logger } = require("../logging/Logger")
{ Point } = require("../BasicTypes")

logger = new Logger("Models")

class User extends Backbone.Model
  @create: (data) -> null
  defaults: {
    id: null,
    name: "[no user]",
    color: "#FF0000"
  }

class Annotation extends Backbone.Model
  @create: (data) -> null
  defaults: {
    id: null,
    title: "[untitled]",
    position: new Point(0, 0),
    author: null,
    read: false,
    watch: false,
    createdAt: new Date()
    posts: []
  }

class Post extends Backbone.Model
  @create: (data) -> null
  defaults: {
    id: null,
    author: null,
    createdAt: new Date(),
    likingUsers: []
  }

class Manager
  get: (id) -> null

class UserManager extends Manager

class AnnotationViewModel
  open: null
  close: null

class PostViewModel
  like: null
  unlike: null

class UserViewModel #???

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

module.exports = { Editor }
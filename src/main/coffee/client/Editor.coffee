{ Logger } = require("../logging/Logger")

logger = new Logger("Editor")

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
  ###
  - 1 grid
  - n TemporaryCanvas
  ###

class Grid

class TemporaryCanvas

class Editor
  constructor: (divContainer, readOnly) ->
    #register onmouse- and ontouch-events
    #register shortcuts
  setMode: (mode) -> #or set tool?
  selectLayer: (index) ->
  resize: ->
  ###
  -input
    -setTileHistory
  -output
    -onBegin(startInfo)
    -onMove(mousePosition)
    -onCommit()
    -onCancel()
  ###

module.exports = { Editor }
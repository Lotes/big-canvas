class Rectangle
  constructor: (@xMin, @yMin, @xMax, @yMax) ->

class QuadTreeNode
  constructor: (@xMin, @yMin, @xMax, @yMax) ->
    @isSubdivided = false
    @x = @xMin.add(@xMax).divide(2)
    @y = @yMin.add(@yMax).divide(2)
    @q1 = null
    @q2 = null
    @q3 = null
    @q4 = null
    @parent = null
  subdivide:  ->
    if(!@isSubdivided)
      @q1 = new Node(   @x,    @y, @xMax, @yMax)
      @q2 = new Node(@xMin,    @y,    @x, @yMax)
      @q3 = new Node(@xMin, @yMin,    @x,    @y)
      @q4 = new Node(   @x, @yMin, @xMax,    @y)
      @q1.parent = this
      @q2.parent = this
      @q3.parent = this
      @q4.parent = this
      @isSubdivided = true

class QuadTree
  constructor: ->
  update: (key, rectangle) ->
  remove: (key) ->

module.exports = {
  QuadTree,
  QuadTreeNode,
  Rectangle
}
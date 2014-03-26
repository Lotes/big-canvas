_ = require("underscore")
BigInteger = require("big-integer")
{ Interval, IntervalTree } = require("./IntervalTree")

class WindowTree
  constructor: ->
    less = (lhs, rhs) ->
      lhs.lesser(rhs)
    minimum = BigInteger(-100)
    maximum = BigInteger(-100)
    @horizontalTree = new IntervalTree(less, minimum, maximum)
    @verticalTree = new IntervalTree(less, minimum, maximum)
  addOrUpdate: (name, tileWindow) ->
    @horizontalTree.add(
      name,
      new Interval(tileWindow.min.column, tileWindow.max.column)
    )
    @verticalTree.add(
      name,
      new Interval(tileWindow.min.row, tileWindow.max.row)
    )
  remove: (name) ->
    @horizontalTree.remove(name)
    @verticalTree.remove(name)
  getOverlappings: (tileWindow) ->
    _.intersection(
      @horizontalTree.getOverlappings(tileWindow.min.column, tileWindow.max.column),
      @verticalTree.getOverlappings(tileWindow.min.row, tileWindow.max.row)
    )

module.exports = WindowTree
config = require("./server/Config")
BigInteger = require("big-integer")

class Point
  constructor: (x, y) ->
    @x = BigInteger(x)
    @y = BigInteger(y)
  equals: (other) ->
    @x.equals(other.x) && @y.equals(other.y)
  minus: (other) ->
    new Point(@x.minus(other.x), @y.minus(other.y))
  add = (other) ->
    new Point(@x.add(other.x), @y.add(other.y))
  toData: ->
    [@x.toString(), @y.toString()]
  toLocation: ->
    size = config.TILE_SIZE
    x = @x
    y = @y
    #determine the column
    if(!x.isNegative())
      col = x.divide(size)
    else
      dm = x.divmod(size)
      col = dm.quotient
      if(!dm.remainder.equals(BigInteger.zero))
         col = col.prev()
    #determine the row
    if(!y.isNegative())
      row = y.divide(size)
    else
      dm = y.divmod(size)
      row = dm.quotient
      if(!dm.remainder.equals(BigInteger.zero))
        row = row.prev()
    new TileLocation(col, row)

class TileLocation
  constructor: (column, row) ->
    @column = BigInteger(column)
    @row = BigInteger(row)
  toData: ->
    [@column.toString(), @row.toString()]
  toPoint: ->
    size = config.TILE_SIZE
    new Point(@column * size, @row * size)
  equals: (other) ->
    @column.equals(other.column) && @row.equals(other.row)

class User
  constructor: (@id, @name, @defaultColor) ->

class Site
  constructor: (@id, @mode, @location) ->

class UserWindow
  constructor: (x, y, width, height) ->
    @x = BigInteger(x)
    @y = BigInteger(y)
    @width = width #simple number
    @height = height #simple number
  toAbsoluteWindow: (site) ->
    offset = site.location.toPoint()
    topLeft = new Point(@x.add(offset.x), @y.add(offset.y))
    bottomRight = new Point(topLeft.x.add(@width).minus(1), topLeft.y.add(@height).minus(1))
    new TileWindow(topLeft.toLocation(), bottomRight.toLocation())
  toString: ->
    "UserWindow(x: "+@x.toString()+"; y: "+@y.toString()+"; width: "+@width+"; height: "+@height+")"
  toData: ->
    [@x.toString(), @y.toString(), @width, @height]
  siteTranslate: (sourceSite, targetSite) ->
    sourceOffset = sourceSite.location.toPoint()
    targetOffset = targetSite.location.toPoint()
    newX = @x.minus(sourceOffset.x).add(targetOffset.x)
    newY = @y.minus(sourceOffset.y).add(targetOffset.y)
    new UserWindow(newX, newY, @width, @height)

class TileWindow
  constructor: (@min, @max) ->

module.exports = {
  User,
  Site,
  Point,
  TileLocation,
  UserWindow,
  TileWindow
}
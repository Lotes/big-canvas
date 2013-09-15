var Config = require("./Config");
var BigInteger = require("big-integer");

/**
 * A point in 2D with x- and y-coordinate. This implementation uses big integers for the coordinates.
 * @class Point
 * @constructor
 * @param {BigInteger, Number, String} x the x-coordinate
 * @param {BigInteger, Number, String} y the y-coordinate
 */
function Point(x, y) {
  this.x = BigInteger(x);
  this.y = BigInteger(y);
}

/**
 * Test on equality between this and another point.
 * @method equals
 * @param {Point} other the other point you want to test on equality
 * @return {Boolean} Returns true if this point is equal to the other point, false otherwise.
 */
Point.prototype.equals = function(other) {
  return this.x.equals(other.x) && this.y.equals(other.y);
};

/**
 * Subtracts the other point component-wise from this point.
 * @method minus
 * @param {Point} other the other point you want to subtract from this point
 * @return {Point} Returns the difference point.
 */
Point.prototype.minus = function(other) {
  return new Point(this.x.minus(other.x), this.y.minus(other.y));
};

/**
 * Transforms this object into a small data object just containing strings.
 * @method toData
 * @return {Object} Returns a small data object.
 */
Point.prototype.toData = function() {
  return {
    x: this.x.toString(),
    y: this.y.toString()
  };
};

/**
 * Transforms a point to a tile location.
 * @method toLocation
 * @return {TileLocation} Returns the location of the tile where this point lies in.
 */
Point.prototype.toLocation = function() {
  var size = Config.TILE_SIZE,
      x = this.x,
      y = this.y,
      col,
      row;
  //determine the column
  if(!x.isNegative()) {
    col = x.divide(size);
  } else {
    var dm = x.divmod(size);
    col = dm.quotient;
    if(!dm.remainder.equals(BigInteger.zero))
       col = col.prev();
  }
  //determine the row
  if(!y.isNegative()) {
    row = y.divide(size);
  } else {
    var dm = y.divmod(size);
    row = dm.quotient;
    if(!dm.remainder.equals(BigInteger.zero))
      row = row.prev();
  }
  return new TileLocation(col, row);
};

/**
 * A location of a tile in 2D. This implementation uses big integers for the coordinates.
 * @class TileLocation
 * @constructor
 * @param {BigInteger, Number, String} column the column
 * @param {BigInteger, Number, String} row the row
 */
function TileLocation(column, row) {
  this.column = BigInteger(column);
  this.row = BigInteger(row);
}

/**
 * Transforms this object into a small data object just containing strings.
 * @method toData
 * @return {Object} Returns a small data object.
 */
TileLocation.prototype.toData = function() {
  return {
    column: this.column.toString(),
    row: this.row.toString()
  };
};

/**
 * Determine the upper-left point of this tile location.
 * @method toPoint
 * @return {Object} Returns the upper-left point of this tile location.
 */
TileLocation.prototype.toPoint = function() {
  var size = Config.TILE_SIZE;
  return new Point(this.column * size, this.row * size);
};

/**
 * Compares this tile location with another for equality.
 * @param other {TileLocation}
 * @returns {Boolean} true, iff column and row are equal
 */
TileLocation.prototype.equals = function(other) {
  return this.column.equals(other.column) && this.row.equals(other.row);
};

/**
 * A bounding box in 2D. This implementation uses big integers for the limits.
 * @class BoundingBox
 * @constructor
 */
function BoundingBox() {
  this.minX = null;
  this.minY = null;
  this.maxX = null;
  this.maxY = null;
}

/**
 * Adds a point to the bounding box.
 * @method addPoint
 * @param {Point} point
 */
BoundingBox.prototype.addPoint = function(point) {
  if(this.minX == null) {
    this.minX = this.maxX = point.x;
    this.minY = this.maxY = point.y;
  } else {
    if(this.minX.greater(point.x)) this.minX = point.x;
    if(this.minY.greater(point.y)) this.minY = point.y;
    if(this.maxX.lesser(point.x)) this.maxX = point.x;
    if(this.maxY.lesser(point.y)) this.maxY = point.y;
  }
};

/**
 * Determine the minimum limit point.
 * @method getMin
 * @return {Point} Returns lower limits of the box as point.
 */
BoundingBox.prototype.getMin = function() {
  return new Point(this.minX, this.minY);
};

/**
 * Determine the maximum limit point.
 * @method getMax
 * @return {Point} Returns upper limits of the box as point.
 */
BoundingBox.prototype.getMax = function() {
  return new Point(this.maxX, this.maxY);
};

/**
 * Extends the bounding box by a certain amount.
 * @method extend
 * @param {BigInteger, Number} value
 */
BoundingBox.prototype.extend = function(value) {
  this.minX = this.minX.minus(value);
  this.minY = this.minY.minus(value);
  this.maxX = this.maxX.add(value);
  this.maxY = this.maxY.add(value);
};

/**
 * @method getWidth
 * @return {BigInteger} Returns the width of the bounding box.
 */
BoundingBox.prototype.getWidth = function() {
  return this.maxX.minus(this.minX).next();
};

/**
 * @method getHeight
 * @return {BigInteger} Returns the height of the bounding box.
 */
BoundingBox.prototype.getHeight = function() {
  return this.maxY.minus(this.minY).next();
};

module.exports = {
  Point: Point,
  TileLocation: TileLocation,
  BoundingBox: BoundingBox
};

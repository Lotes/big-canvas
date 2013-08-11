var Config = require("./Config");
var BigInteger = require("big-integer");

function Point(x, y) {
  this.x = BigInteger(x);
  this.y = BigInteger(y);
}

Point.prototype.equals = function(other) {
  return this.x.equals(other.x) && this.y.equals(other.y);
};

Point.prototype.minus = function(other) {
  return new Point(this.x.minus(other.x), this.y.minus(other.y));
};

Point.prototype.toData = function() {
  return {
    x: this.x.toString(),
    y: this.y.toString()
  };
};

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

function TileLocation(column, row) {
  this.column = BigInteger(column);
  this.row = BigInteger(row);
}

TileLocation.prototype.toData = function() {
  return {
    column: this.column.toString(),
    row: this.row.toString()
  };
};

TileLocation.prototype.toPoint = function() {
  var size = Config.TILE_SIZE;
  return new Point(this.column * size, this.row * size);
};

function BoundingBox() {
  this.minX = null;
  this.minY = null;
  this.maxX = null;
  this.maxY = null;
}

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

BoundingBox.prototype.getMin = function() {
  return new Point(this.minX, this.minY);
};

BoundingBox.prototype.getMax = function() {
  return new Point(this.maxX, this.maxY);
};

BoundingBox.prototype.extend = function(value) {
  this.minX = this.minX.minus(value);
  this.minY = this.minY.minus(value);
  this.maxX = this.maxX.add(value);
  this.maxY = this.maxY.add(value);
};

BoundingBox.prototype.getWidth = function() {
  return this.maxX.minus(this.minX).next();
};

BoundingBox.prototype.getHeight = function() {
  return this.maxY.minus(this.minY).next();
};

module.exports = {
  Point: Point,
  TileLocation: TileLocation,
  BoundingBox: BoundingBox
};

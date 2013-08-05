var Config = require("./Config");
var BigInteger = require("big-integer");

function Point(x, y) {
  this.x = BigInteger(x);
  this.y = BigInteger(y);
}

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

function Window(x, y, width, height) {
  this.x = BigInteger(x);
  this.y = BigInteger(y);
  this.width = BigInteger(width);
  this.height = BigInteger(height);
  //calculate region
  this.region = [];
  //TODO
}

Window.prototype.toData = function() {
  return {
    x: this.x.toString(),
    y: this.y.toString(),
    width: this.width.toString(),
    height: this.height.toString()
  };
};

function WindowTree() {
  this.tree = {};
}

WindowTree.prototype.set = function(tileLocation, id) {
  var data = tileLocation.toData();
  if(!(data.column in this.tree))
    this.tree[data.column] = {};
  var rowTree = this.tree[data.column];
  if(!(data.row in rowTree))
    rowTree[data.row] = {};
  var idTree = rowTree[data.row];
  idTree[id] = true;
};

function isEmptyObject(obj) {
  for(var prop in obj)
    if(obj.hasOwnProperty(prop))
      return false;
  return true;
}

WindowTree.prototype.unset = function(tileLocation, id) {
  var data = tileLocation.toData();
  if(data.column in this.tree
    && data.row in this.tree[data.column]
    && id in this.tree[data.column][data.row]) {
    delete this.tree[data.column][data.row][id];
    if(isEmptyObject(this.tree[data.column][data.row])) {
      delete this.tree[data.column][data.row];
      if(isEmptyObject(this.tree[data.column]))
        delete this.tree[data.column];
    }
  }
};

WindowTree.prototype.addWindow = function(win, winId) {
  var region = win.region;
  for(var i=0; i<region.length; i++) {
    var tileLocation = region[i];
    this.set(tileLocation, winId);
  }
};

WindowTree.prototype.removeWindow = function(win, winId) {
  var region = win.region;
  for(var i=0; i<region.length; i++) {
    var tileLocation = region[i];
    this.unset(tileLocation, winId);
  }
};

WindowTree.prototype.getWindows = function(tileLocation) {
  //returns all windowIds whose region intersects the given tile
  var data = tileLocation.toData();
  var result = [];
  if(data.column in this.tree
    && data.row in this.tree[data.column]) {
    for(var id in this.tree[data.column][data.row])
      result.push(id);
  }
  return result;
};

module.exports = {
  Point: Point,
  TileLocation: TileLocation,
  Window: Window,
  WindowTree: WindowTree
};

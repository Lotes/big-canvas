var BigInteger = require("big-integer");
var Types = require("../Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;

/**
 * A window is the spectator area of a user at the endless canvas.
 * @class Window
 * @constructor
 */
function Window(x, y, width, height) {
  this.x = BigInteger(x);
  this.y = BigInteger(y);
  this.width = BigInteger(width);
  this.height = BigInteger(height);
  //calculate region
  this.region = [];
  var start = new Point(this.x, this.y).toLocation();
  var end = new Point(this.x.add(this.width).prev(), this.y.add(this.height).prev()).toLocation();
  for(var col = start.column; col.lesserOrEquals(end.column); col = col.next())
    for(var row = start.row; row.lesserOrEquals(end.row); row = row.next())
      this.region.push(new TileLocation(col, row));
}

/**
 * Transforms this object into a small data object just containing strings.
 * @method toData
 * @returns {Object} A small data object.
 */
Window.prototype.toData = function() {
  return {
    x: this.x.toString(),
    y: this.y.toString(),
    width: this.width.toString(),
    height: this.height.toString()
  };
};

/**
 * A window tree collects a set of all active windows plus their ids and returns all window ids for a given tile location.
 * @class WindowTree
 * @constructor
 */
function WindowTree() {
  this.tree = {};
}

/**
 * Annotates this tree at the given location with the given id.
 * @method set
 * @param {TileLocation} tileLocation
 * @param {String, Number} id any id to associated data
 */
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

/**
 * Un-annotates this tree at the given location from the given id.
 * @method unset
 * @param {TileLocation} tileLocation
 * @param {String, Number} id any id to associated data
 */
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

/**
 * Annotates this tree at the tile locations of the given window with the given id.
 * @method addWindow
 * @param {Window} win
 * @param {String, Number} id any id to associated data
 */
WindowTree.prototype.addWindow = function(win, winId) {
  var region = win.region;
  for(var i=0; i<region.length; i++) {
    var tileLocation = region[i];
    this.set(tileLocation, winId);
  }
};

/**
 * Un-annotates this tree at the tile locations of the given window from the given id.
 * @method removeWindow
 * @param {Window} win
 * @param {String, Number} id any id to associated data
 */
WindowTree.prototype.removeWindow = function(win, winId) {
  var region = win.region;
  for(var i=0; i<region.length; i++) {
    var tileLocation = region[i];
    this.unset(tileLocation, winId);
  }
};

/**
 * Queries for all window ids at a given tile location.
 * @method getWindows
 * @param {TileLocation} tileLocation
 * @returns {[Number, String]} returns all ids at the given location
 */
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

Types.Window = Window;
Types.WindowTree = WindowTree;

module.exports = Types;
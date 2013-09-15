function Node(key, value) {
  this.next = null;
  this.previous = null;
  this.getKey = function() { return key; };
  this.getValue = function() { return value; };
}

/**
 * A general-purpose cache storage.
 * @class Cache
 * @param maxSize {Integer} the maximum number of elements. If more elements get inserted, the least recently used
 *                element gets dropped
 * @constructor
 */
function Cache(maxSize) {
  this.maxSize = maxSize;
  this.size = 0;
  this.first = null;
  this.last = null;
  this.elements = {};
}

Cache.prototype.delete = function(key) {
  //assert(key in this.elements)
  var node = this.first;
  while(node != null && node.getKey() != key)
    node = node.next;
  if(node != null) {
    if(node.next != null)
      node.next.prev = node.prev;
    if(node.prev != null)
      node.prev.next = node.next;
  }
  this.size--;
  delete this.elements[key];
};

Cache.prototype.add = function(key, value) {
  //assert(key in this.elements)
  var node = new Node(key, value);
  if(this.first == null) {
    this.first = node;
    this.last = node;
  } else {
    node.next = this.first;
    this.first.prev = node;
    this.first = node;
  }
  if(this.size >= this.maxSize) {
    //delete last one
    var delKey = this.last.getKey();
    delete this.elements[delKey];
    this.last = this.last.previous;
    this.last.next = null;
  } else
    this.size++;
};

/**
 * Retrieves the value under the given key or null if the key was not added to this cache.
 * @method get
 * @param key
 * @returns {*} null if the key is not stored in this cache
 */
Cache.prototype.get = function(key) {
  if(!(key in this.elements))
    return null;
  var value = this.elements[key].getValue();
  this.delete(key);
  this.add(key, value);
  return value;
};

/**
 * adds an value to the cache. Do not use add()!
 * @methdo set
 * @param key
 * @param value
 */
Cache.prototype.set = function(key, value) {
  if(key in this.elements)
    this.delete(key);
  this.add(key, value);
};

module.exports = Cache;
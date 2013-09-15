var EventEmitter = require('events').EventEmitter;

/**
 * A helper class for mutual exclusion.
 * @class Mutex
 * @constructor
 */
function Mutex() {
  var self = this;
  var queue = [];
  var locked = false;

  /**
   * @method acquire
   * @param fn {Function} the code to be executed in the critical section
   */
  self.acquire = function(fn) {
    if (locked) {
      queue.push(fn);
    } else {
      locked = true;
      fn();
    }
  };

  /**
   * @method release
   */
  self.release = function() {
    locked = false;
    if(queue.length > 0) {
      var fn = queue.shift();
      self.acquire(fn);
    }
  };
};

var mutexes = {};

/**
 * @method lock
 * @param key {String} the unique name of the lock
 * @param callback {Function(done)} A callback that will be executed when the mutex gets acquired. Call the function
 *                                  "done" to release the mutex.
 */
module.exports = function(key, callback) {
  if(!mutexes[key])
    mutexes[key] = new Mutex();
  var mutex = mutexes[key];
  //console.log("tried to acquire "+key);
  mutex.acquire(function() {
    //console.log("acquired "+key);
    callback(function() {
      //console.log("released "+key);
      mutex.release();
    });
  });
};
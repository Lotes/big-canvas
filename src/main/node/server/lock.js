var EventEmitter = require('events').EventEmitter;

/**
 * A helper class for mutual exclusion.
 * @class Mutex
 * @constructor
 */
function Mutex() {
  var self = this;
  var queue = new EventEmitter();
  var locked = false;
  queue.setMaxListeners(0);

  /**
   * @method acquire
   * @param fn {Function} the code to be executed in the critical section
   */
  self.acquire = function(fn) {
    if (locked) {
      queue.once('ready', function() { self.acquire(fn); });
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
    queue.emit('ready');
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
  mutex.acquire(function() {
    callback(function() {
      mutex.release();
    });
  });
};
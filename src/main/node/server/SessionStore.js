var DatabaseConnection = require("./DatabaseConnection");
var Sessions = require("./data/Sessions");

module.exports = function(connect) {
    var Store = connect.session.Store;

    function SessionStore(options, callback) {
        options = options || {};
        Store.call(this, options);
        callback && callback();
    };

    SessionStore.prototype.__proto__ = Store.prototype;
    SessionStore.prototype.get = function(sid, callback) {
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); callback(err); }
        else {
          Sessions.get(connection, sid, function(err, obj) {
            connection.end();
            if(err) callback(err);
            else callback(null, obj);
          });
        }
      });
    };
    SessionStore.prototype.set = function(sid, session, callback) {
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); callback(err); }
        else {
          Sessions.set(connection, sid, session, function(err) {
            connection.end();
            if(err) callback(err);
            else callback();
          });
        }
      });
    };
    SessionStore.prototype.destroy = function(sid, callback) {
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); callback(err); }
        else {
          Sessions.destroy(connection, sid, session, function(err) {
            connection.end();
            if(err) callback(err);
            else callback();
          });
        }
      });
    };
    return SessionStore;
};
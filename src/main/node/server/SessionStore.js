var Sessions = require("./data/Sessions");

module.exports = function(connect) {
    var Store = connect.session.Store;

    function SessionStore(options, callback) {
        options = options || {};
        Store.call(this, options);
        callback && callback();
    };

    SessionStore.prototype.__proto__ = Store.prototype;
    SessionStore.prototype.get = function(sid, callback) { Sessions.get(sid, callback); };
    SessionStore.prototype.set = function(sid, session, callback) { Sessions.set(sid, session, callback); };
    SessionStore.prototype.destroy = function(sid, callback) { Sessions.destroy(sid, callback); };
    return SessionStore;
};
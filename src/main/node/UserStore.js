var path = require("path");
var fs = require("fs");

module.exports = function(connect) {
    var Store = connect.session.Store;

    function SessionStore(options, callback) {
        options = options || {};
        options.path = options.path || __dirname + "/sessions";
        Store.call(this, options);
        this.sessionPath = options.path;
        callback && callback();
    };

    SessionStore.prototype.__proto__ = Store.prototype;

    SessionStore.prototype.get = function(sid, callback) {
        var filename = path.join(this.sessionPath, sid);
        var self = this;
        fs.readFile(filename, function (err, data) {
            if(err)
                callback && callback(err, null);
            else {
                try {
                    var session = JSON.parse(data);
                    if (!session.cookie.expires || new Date() >= new Date(session.cookie.expires)) {
                        self.destroy(sid, callback);
                    } else {
                        callback(null, session);
                    }
                } catch(e) {
                    callback && callback(e, null);
                }
            }
        });
    };

    SessionStore.prototype.set = function(sid, session, callback) {
        if (session && session.cookie) {
            if (!session.cookie.expires) {
                var today = new Date(),
                    twoWeeks = 1000 * 60 * 60 * 24 * 14;
                session.cookie.expires = new Date(today.getTime() + twoWeeks);
            }
            var filename = path.join(this.sessionPath, sid);
            var data = JSON.stringify(session);
            fs.writeFile(filename, data, function(err) {
                if(err)
                    callback && callback(err);
                else {
                    callback && callback(null);
                }
            });
        } else
            callback && callback(null);
    };

    SessionStore.prototype.destroy = function(sid, callback) {
        var filename = path.join(this.sessionPath, sid);
        fs.exists(filename, function(ex) {
            if(ex) {
                fs.unlink(filename, callback);
            } else
                callback && callback();
        });
    };

    SessionStore.prototype.length = function(callback) {
        fs.readdir(this.sessionPath, function(err, files) {
            if(err)
                callback && callback(err);
            else
                callback && callback(null, files.length);
        });
    };

    SessionStore.prototype.clear = function(callback) {
        fs.readdir(this.sessionPath, function(err, files) {
            if(err)
                callback && callback(err);
            else {
                var deleted = 0;
                for(var index = 0; index < files.length; index++) {
                    var filename = path.join(this.sessionPath, files[index]);
                    fs.unlink(filename, function() {
                        deleted++;
                        if(deleted == files.length)
                            callback && callback();
                    });
                };
            }
        });
    };

    return SessionStore;
};
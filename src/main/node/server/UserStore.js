var path = require("path");
var fs = require("fs");

function UserStore(options) {
    options = options || {};
    options.path = options.path || __dirname + "/users";
    this.userPath = options.path;
};

UserStore.prototype.get = function(uid, callback) {
    var filename = path.join(this.userPath, uid.toString());
    var self = this;
    fs.readFile(filename, function (err, data) {
        if(err)
            callback && callback(err, null);
        else {
            try {
                var user = JSON.parse(data);
                callback && callback(null, user);
            } catch(e) {
                callback && callback(e, null);
            }
        }
    });
};

UserStore.prototype.set = function(uid, user, callback) {
    var filename = path.join(this.userPath, uid.toString());
    var data = JSON.stringify(user);
    fs.writeFile(filename, data, function(err) {
        if(err)
            callback && callback(err);
        else {
            callback && callback(null);
        }
    });
};

UserStore.prototype.create = function(user, callback) {
    var self = this;
    var filename = path.join(this.userPath, "id");
    fs.readFile(filename, function (err, data) {
        if(err)
            callback && callback(err);
        else {
            var uid = parseInt(data, 10);
            data = uid+1;
            fs.writeFile(filename, data, function(err) {
                if(err)
                    callback && callback(err);
                else
                    self.set(uid, user, function(err) {
                        callback && callback(err, uid);
                    });
            });
        }
    });
};


module.exports = UserStore;
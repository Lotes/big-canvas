var Config = require("./Config");
var Generator = require("./../rpc/json-rpc-generator");
var fs = require("fs");
var definitionsText = fs.readFileSync(Config.RPC_DEFINITIONS_PATH, { encoding: "utf8" });
var generator = new Generator(definitionsText);
var BigCanvas = {
    Types: generator.Types,
    Server: new generator.Interfaces.Main.Server({
        constructor: function() {
            this.sockets = {};
        },
        connect: function(socket) {
            this.sockets[socket.getId()] = socket;
        },
        disconnect: function(socket) {
            delete this.sockets[socket.getId()];
        },
        //remote procedure call implementations
        setName: function(name, callback) {
            callback();
        }
    })
};
module.exports = BigCanvas;
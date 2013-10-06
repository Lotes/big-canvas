var Generator = require("./json-rpc-generator");
var definitionsText = require("./big-canvas");
var generator = new Generator(definitionsText);
module.exports = generator;
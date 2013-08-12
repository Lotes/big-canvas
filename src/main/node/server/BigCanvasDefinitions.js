var Generator = require("./../rpc/json-rpc-generator");
var definitionsText = require("../rpc/big-canvas");
var generator = new Generator(definitionsText);
module.exports = generator;
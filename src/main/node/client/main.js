var Config = require("./Config");
var _ = require("underscore");
var Backbone = require("backbone");
var BigInteger = require("big-integer");
var BigCanvas = require("./BigCanvas");

$(function() {
  var bigCanvas = new BigCanvas(function(err) {
    if(err)
      throw err;

    bigCanvas.Client.setName("Test", function(err) {
      if(err)
        console.log(err);
      else
        console.log("success");
    })
  });
});


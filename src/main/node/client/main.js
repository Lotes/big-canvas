var Config = require("./Config");
var _ = require("underscore");
var Backbone = require("backbone");
var BigInteger = require("big-integer");
var BigCanvas = require("./BigCanvas");
var Point = require("../Types").Point;

function randomBigInteger() {
  var digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var digitCount = Math.round(Math.random() * 30) + 1;
  var negative = Math.random() <= 0.5;
  var str = digits[Math.floor(Math.random() * 9) + 1];
  for(var i = 0; i < digitCount - 1; i++)
    str = str + digits[Math.floor(Math.random() * 10)];
  if(negative)
    str = "-" + str;
  return BigInteger(str);
}

$(function() {
  var bigCanvas = new BigCanvas(function(err) {
    if(err)
      throw err;

    //setup router
    var Router = Backbone.Router.extend({ routes: { "x=:x&y=:y": "setOrigin" } });
    var router = new Router();
    function navigate(x, y, trigger) {
      router.navigate("#x="+x.toString()+"&y="+y.toString(), {trigger: trigger});
    };
    router.on('route:setOrigin', function (strX, strY) {
      var x, y;
      try {
        x = BigInteger(strX);
        y = BigInteger(strY);
      } catch(ex) {
        x = BigInteger.zero;
        y = BigInteger.zero;
        navigate(x, y, false);
      }
      bigCanvas.moveTo(new Point(x, y))
    });
    Backbone.history.start();
    if(document.location.toString().indexOf("#") == -1) {
      var x = randomBigInteger(),
          y = randomBigInteger();
      navigate(x, y, true);
    }

    /*bigCanvas.Client.setName("Test", function(err) {
      if(err)
        console.log(err);
      else
        console.log("success");
    })*/
  });
});


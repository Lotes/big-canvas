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
  var bigCanvasElement = $("#big-canvas")[0];
  var bigCanvas = new BigCanvas(bigCanvasElement);

  //configure shortcuts
  Mousetrap.bind(['command+z', 'ctrl+z'], function() {
    bigCanvas.undo();
  });

  //configure buttons
  var $moveButton = $("#moveButton");
  var $brushButton = $("#brushButton");
  var $eraserButton = $("#eraserButton");
  var modeButtons = [$moveButton, $brushButton, $eraserButton];
  function activateButton($button) {
    for(var i=0; i<modeButtons.length; i++)
      modeButtons[i].removeClass("activated");
    $button.addClass("activated");
  };
  $("#undoButton").click(function() { bigCanvas.undo(); });
  $("#redoButton").click(function() { bigCanvas.redo(); });
  $moveButton.click(function() {
    bigCanvas.setMode("MOVE");
    activateButton($moveButton);
  });
  $brushButton.click(function() {
    bigCanvas.setMode("BRUSH");
    activateButton($brushButton);
  });
  $eraserButton.click(function() {
    bigCanvas.setMode("ERASER");
    activateButton($eraserButton);
  });

  //configure options
  var $colorPicker = $('#colorPicker');
  $colorPicker.palette({
    color: bigCanvas.getColor(),
    onChange: function() {
      var color = "#"+$colorPicker.data('palette').palette.data("palette").color.hex;
      bigCanvas.setColor(color);
      $colorPicker.css("background-color", color);
    }
  });

  //setup router
  var Router = Backbone.Router.extend({ routes: { "x=:x&y=:y": "moveTo" } });
  var router = new Router();
  function navigate(x, y, trigger) {
    router.navigate("#x="+x.toString()+"&y="+y.toString(), {trigger: trigger});
  };
  router.on('route:moveTo', function (strX, strY) {
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
  bigCanvas.on("move", function(center) {
    navigate(center.x, center.y, true);
  })
});


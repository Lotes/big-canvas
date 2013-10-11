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
  //initialize big-canvas
  var bigCanvasElement = $("#canvas-region")[0];
  var bigCanvas = new BigCanvas(bigCanvasElement);

  //initialize layout
  var layout = $('body').layout({
    pane__spacing: 0,
    north__resizable: false,
    north__closable: false,
    south__resizable: false,
    south__closable: false,
    north__spacing_open: 0,
    south__spacing_open: 0,
    /*east__resizable: false,
     east__closable: true,
     east__spacing_open: 0,
     east__spacing_closed: 0,*/

    paneClass: "region",
    north__paneSelector: "#header-region",
    //east__paneSelector: "#comments-region",
    center__paneSelector: "#canvas-region",
    south__paneSelector: "#tools-region",

    north__size: 50,
    south__size: 50
    //east__size: 381 //like in google maps :D
  });

  //initialize color picker
  var color = bigCanvas.getColor();
  var $colorPickerDialog = $("#colorpicker-dialog");
  $colorPickerDialog.dialog({
    autoOpen: false,
    minWidth: 600,
    modal: true,
    buttons: {
      'Close': function() {
        $(this).dialog('close');
      }
    }
  });
  var $colorBucket = $(".color-bucket .bucket-foreground");
  $colorBucket.click(function() {
    $colorPickerDialog.dialog("open");
  });
  $('#colorpicker').colorpicker({
    showOn: "click",
    alpha: true,
    color: color,
    colorFormat: 'RGBA',
    parts:  [
      //    'header',
      'alpha',
      'map',
      'bar',
      'hex',
      'hsv',
      'rgb',
      'lab',
      'cmyk',
      'inputs'
      //    'preview',
      //    'swatches',
      //    'footer'
    ],
    inlineFrame: false,
    select: function(event, color) {
      var m = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d+(\.\d+)?)\)$/.exec(color.formatted);
      if (m) {
        $colorBucket.css("background-color", color.formatted);
        function rgb2hex(r, g, b) {
          return (256 + r).toString(16).substr(1) +
            (256 + g).toString(16).substr(1) +
            (256 + b).toString(16).substr(1);
        }
        var r = parseInt(m[1], 10);
        var g = parseInt(m[2], 10);
        var b = parseInt(m[3], 10);
        var hexColor = "#"+rgb2hex(r, g, b);
        var opacity = parseFloat(m[4]);
        bigCanvas.setColor(hexColor);
        bigCanvas.setOpacity(opacity);
      }
    }
  });
  $colorBucket.css("background-color", color);

  //initialize sliders
  var $sizeSlider = $("#size-slider .toolsslider-slider");
  var $sizeSliderValue = $("#size-slider .toolsslider-value");
  function setSize() {
    var value = $sizeSlider.slider("value");
    $sizeSliderValue.html(value);
    bigCanvas.setStrokeWidth(value);
  }
  $sizeSlider.slider({
    orientation: "horizontal",
    max: 100,
    min: 1,
    value: bigCanvas.getStrokeWidth(),
    //slide: setSize,
    change: setSize
  });

  //initialize tools
  function activateTool($element) {
    $element.addClass("toolsbutton-activated");
  }
  function deactivateTools() {
    $(".main-tools").removeClass("toolsbutton-activated");
  }
  var $moveButton = $("#move-button");
  $moveButton.click(function() {
    deactivateTools();
    activateTool($moveButton);
    bigCanvas.setMode("MOVE");
  });
  var $brushButton = $("#brush-button");
  $brushButton.click(function() {
    deactivateTools();
    activateTool($brushButton);
    bigCanvas.setMode("BRUSH");
  });
  var $eraserButton = $("#eraser-button");
  $eraserButton.click(function() {
    deactivateTools();
    activateTool($eraserButton);
    bigCanvas.setMode("ERASER");
  });
  var $undoButton = $("#undo-button");
  $undoButton.click(function() {
    bigCanvas.undo();
  });
  var $redoButton = $("#redo-button");
  $redoButton.click(function() {
    bigCanvas.redo();
  });
  activateTool($moveButton);

  //configure shortcuts
  Mousetrap.bind(['command+z', 'ctrl+z'], function() {
    bigCanvas.undo();
  });

  //setup router
  var Router = Backbone.Router.extend({ routes: { "x=:x&y=:y": "moveTo" } });
  var router = new Router();
  function navigate(x, y, trigger) {
    router.navigate("#x="+x.toString()+"&y="+y.toString(), {trigger: trigger});
  }
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


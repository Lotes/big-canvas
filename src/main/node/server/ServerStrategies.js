var Canvas = require("canvas");

function ServerStrategies() {}

ServerStrategies.prototype.createCanvas = function(width, height) {
  return new Canvas(width, height);
};

ServerStrategies.prototype.drawCanvas = function(destinationCanvas, sourceCanvas) {
  var g = destinationCanvas.getContext("2d"),
    sourceImage = new Canvas.Image();
  sourceImage.src = sourceCanvas.toBuffer();
  g.drawImage(sourceImage, 0, 0);
};

module.exports = ServerStrategies;
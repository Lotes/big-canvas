function ClientStrategies() {}

ClientStrategies.prototype.createCanvas = function(width, height) {
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

ClientStrategies.prototype.drawCanvas = function(destinationCanvas, sourceCanvas) {
  var g = destinationCanvas.getContext("2d");
  g.drawImage(sourceCanvas, 0, 0);
};

module.exports = ClientStrategies;
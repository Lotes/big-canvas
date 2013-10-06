/**
 * Defines an abstract interface for producing and handling objects with same semantics but different implementations on
 * client and server side (like a canvas). This is just an interface description, which has to be implemented for server
 * and client.
 * @class AbstractStrategies
 * @constructor
 */
function AbstractStrategies() {}

/**
 * @method createCanvas
 * @param width {Integer}
 * @param height {Integer}
 * @returns {Canvas}
 */
AbstractStrategies.prototype.createCanvas = function(width, height) {
  throw new Error("Not implemented (abstract method)!");
};

/**
 * @method drawCanvas
 * @param destinationCanvas {Canvas} the destination canvas where the source canvas will be painted on
 * @param sourceCanvas {Canvas}
 */
AbstractStrategies.prototype.drawCanvas = function(destinationCanvas, sourceCanvas) {
  throw new Error("Not implemented (abstract method)!");
};

module.exports = AbstractStrategies;
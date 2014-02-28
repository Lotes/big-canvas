var fs = require("fs");

function printHelp() {
  console.log("Usage: stringify <input_file> <output_file>");
  console.log("Generates a node module exporting the input file as a string.");
}

function exitSuccess() {
  process.exit(0);
}

function exitFailure() {
  process.exit(1);
}

function abort(message) {
  console.log(message);
  exitFailure();
}

/* Main */
var args = process.argv.slice(2); // Trim "node" and the script path.

if(args.length != 2) {
  printHelp();
  exitSuccess();
}

var inputFile = args[0];
var outputFile = args[1];
if(fs.existsSync(inputFile)) {
  var input = fs.readFileSync(inputFile, {encoding: "utf8"});
  var string = "";
  for(var i=0; i<input.length; i++)
    switch(input[i]) {
      case "\n": string += "\\n"; break;
      case "\r": string += "\\r"; break;
      case "\t": string += "\\t"; break;
      case "\"": string += "\\\""; break;
      default:   string += input[i]; break;
    }
  var output = 'module.exports = "'+string+'";';
  fs.writeFileSync(outputFile, output);
}
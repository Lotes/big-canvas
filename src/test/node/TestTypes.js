var Config = require("./../../main/node/Config");
var Types = require("./../../main/node/Types");
var Point = Types.Point;
var TileLocation = Types.TileLocation;
var expect = require("expect.js");

describe('Point', function(){
  describe('#toLocation()', function(){
    it('should return the correct tile location', function(){
      var tests = [
        {
          x: 0,
          y: 0,
          column: "0",
          row: "0"
        },
        {
          x: Config.TILE_SIZE,
          y: -Config.TILE_SIZE,
          column: "1",
          row: "-1"
        },
        {
          x: - Config.TILE_SIZE - 1,
          y: 0,
          column: "-2",
          row: "0"
        }
      ];
      for(var i = 0; i<tests.length; i++) {
        var test = tests[i];
        var point = new Point(test.x, test.y);
        var location = point.toLocation().toData();
        expect(location.column).to.be(test.column);
        expect(location.row).to.be(test.row);
      }
    });
  });
});
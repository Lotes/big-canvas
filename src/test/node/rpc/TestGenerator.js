var Config = require("./../../../main/node/server/Config");
var Generator = require("./../../../main/node/rpc/json-rpc-generator");
var fs = require("fs");
var definitionsText = fs.readFileSync(Config.RPC_DEFINITIONS_PATH, { encoding: "utf8" });
var generator = new Generator(definitionsText);
var expect = require("expect.js");

describe('RPC Generator', function(){
  describe('#Types', function(){
    it('should validate big integer', function(){
      var BigInteger = generator.Types.BigInteger;
      expect(BigInteger.validate("1234")).to.be.ok();
      expect(BigInteger.validate("-56789")).to.be.ok();
      expect(BigInteger.validate("12345abc6789")).not.to.be.ok();
      expect(BigInteger.validate("iAmAnIdentifier")).not.to.be.ok();
      expect(BigInteger.validate(1234)).not.to.be.ok();
    });

    it('should validate HTML color', function(){
      var Color = generator.Types.Color;
      expect(Color.validate("#C0FFEE")).to.be.ok();
      expect(Color.validate("#DEAD")).not.to.be.ok();
      expect(Color.validate("red")).not.to.be.ok();
      expect(Color.validate("#fff")).not.to.be.ok();
    });

    it('should validate point', function(){
      var Point = generator.Types.Point;
      expect(Point.validate({x: "-1", y: "0"})).to.be.ok();
      expect(Point.validate({x: "2", y: "-3"})).to.be.ok();
      expect(Point.validate({x: 2, y: -3})).not.to.be.ok();
    });

    it('should validate ActionData', function(){
      var ActionData = generator.Types.ActionData;
      expect(ActionData.validate({
        type: "UNDO",
        actionId: "123",
        userId: "456"
      })).to.be.ok();
      expect(ActionData.validate({
        type: "UNDO",
        userId: "456"
      })).not.to.be.ok();
      expect(ActionData.validate({
        type: "UNDO",
        actionId: "123"
      })).not.to.be.ok();
    });
  });
});
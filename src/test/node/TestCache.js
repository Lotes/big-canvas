var Cache = require("../../main/node/Cache");
var expect = require("expect.js");

describe('Cache', function(){
  describe('#set(key, value)', function(){
    it('should return the same value after inserting a single element', function(){
      var cache = new Cache(2),
        key = "1",
        value = "one";
      cache.set(key, value);
      expect(cache.get(key)).to.be(value);
    });
  });
});
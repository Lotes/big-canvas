Cache = require("../../main/node/Cache");
expect = require("expect.js");

describe('Cache', ->
  describe('#set(key, value)', ->
    it('should return the same value after inserting a single element', ->
      cache = new Cache(2)
      key = "1"
      value = "one"
      cache.set(key, value)
      expect(cache.get(key)).to.be(value)
    );
  );
);
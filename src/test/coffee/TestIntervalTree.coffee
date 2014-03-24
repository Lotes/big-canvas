BigInteger = require("big-integer")
{ Interval, IntervalTree } = require("../../main/js/IntervalTree");
expect = require("expect.js");

less = (lhs, rhs) ->
  lhs.lesser(rhs)

createIntervalTree = ->
  new IntervalTree(less, BigInteger(-100), BigInteger(100))

describe("IntervalTree", ->
  describe("#getOverlappings()", ->
    it("should return all overlapping intervals", ->
      tree = createIntervalTree()
      tree.add("a", new Interval(BigInteger(0), BigInteger(5)))
      tree.add("b", new Interval(BigInteger(3), BigInteger(7)))
      tree.add("c", new Interval(BigInteger(4), BigInteger(4)))
      tree.add("d", new Interval(BigInteger(6), BigInteger(20)))
      ###
                   [b; [3; 7]]
                   /         \
          [a; [0; 5]]      [c; [4; 4]]
                                      \
                                    [d; [6; 20]]
      ###
      result = tree.getOverlappings(BigInteger(3), BigInteger(5))
      expect(result.sort()).to.eql(["a", "b", "c"])
      result = tree.getOverlappings(BigInteger(3), BigInteger(3))
      expect(result.sort()).to.eql(["a", "b"])
      result = tree.getOverlappings(BigInteger(19), BigInteger(20))
      expect(result.sort()).to.eql(["d"])
      tree.remove("d")
      result = tree.getOverlappings(BigInteger(19), BigInteger(20))
      expect(result).to.eql([])
      tree.remove("b")
      result = tree.getOverlappings(BigInteger(4), BigInteger(4))
      expect(result.sort()).to.eql(["a", "c"])
    )
  )
)
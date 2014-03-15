###
In this file I test several algorithms for compressing a selection mask.
It should be as small as possible to save network bandwidth.
###

{ circle, rectangle, random } = require("./polygons")
{ polygonEncoding, polygon2selection, runningLengthEncoding, bitMaskEncoding } = require("./algorithms")

testPolygon = (name, polygon) ->
  console.log("Polygon: "+name)
  console.log("-polygon: "+polygonEncoding(polygon))
  selection = polygon2selection(polygon)
  console.log("-bitmask: "+bitMaskEncoding(selection))
  console.log("-running-length: "+runningLengthEncoding(selection))
  console.log()

testPolygon("Circle", circle)
testPolygon("Rectangle", rectangle)
testPolygon("Random", random)
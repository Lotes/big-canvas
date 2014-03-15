SelectionFactory = require("./SelectionFactory")

polygonEncoding = (polygon) ->
  polygon.length * 8
  #JSON.stringify(polygon).length

polygon2selection = (polygon) ->
  SelectionFactory.createFromPolygon(polygon)

bitMaskEncoding = (selection) ->
  length = 8 #for width and height
  length += Math.ceil(selection.width*selection.height/8)
  length

runningLengthEncoding = (selection) ->
  data = [
    1,2,3,4, #for width
    5,6,7,8  #for height
  ]
  length = 0
  bit = selection.getPixel(0, 0)
  for x in [0..(selection.width-1)]
    for y in [0..(selection.height-1)]
      pixel = selection.getPixel(x, y)
      if(bit == pixel)
        length++
        if(length == 127)
          data.push((bit << 7) | length)
          length = 0
      else
        data.push((bit << 7) | length)
        bit = pixel
        length = 1
  if length > 0
    data.push((bit << 7) | length)
  data.length

module.exports = {
  polygonEncoding,
  polygon2selection,
  runningLengthEncoding,
  bitMaskEncoding
}
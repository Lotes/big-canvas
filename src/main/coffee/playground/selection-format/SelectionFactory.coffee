Canvas = require("canvas")
Selection = require("./Selection")

SelectionFactory = {}

SelectionFactory.createRandomNoise = (width, height) ->
  result = new Selection(width, height)
  for x in [0..(width-1)]
    for y in [0..(height-1)]
      result.setPixel(x, y, if Math.random() > 0.5 then 1 else 0 )
  result

#@param polygon, array of integer pairs, e.g. [[1,2], [3,4], ...]
SelectionFactory.createFromPolygon = (polygon) ->
  maxX = 0
  maxY = 0
  for point in polygon
    maxX = Math.max(maxX, point[0])
    maxY = Math.max(maxY, point[1])
  width = maxX + 1
  height = maxY + 1
  #draw
  canvas = new Canvas(width, height)
  context = canvas.getContext("2d")
  context.clearRect(0, 0, width, height)
  context.fillStyle = "#FFFFFF";
  context.beginPath()
  context.moveTo(polygon[0][0], polygon[0][1])
  for index in [1..(polygon.length-1)]
    context.lineTo(polygon[index][0], polygon[index][1])
  context.lineTo(polygon[0][0], polygon[0][1])
  context.closePath()
  context.fill()
  #copy
  result = new Selection(width, height)
  imageData = context.getImageData(0, 0, width, height)
  for x in [0..(width-1)]
    for y in [0..(height-1)]
      pixelIndex = 4*(x + y*width)
      result.setPixel(x, y, if(imageData.data[pixelIndex]==0)then 1 else 0 )
  result

module.exports = SelectionFactory
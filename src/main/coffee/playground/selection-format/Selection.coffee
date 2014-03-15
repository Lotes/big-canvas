class Selection
  constructor: (@width, @height) ->
    length = @width*@height
    @data = new Array(length)
    for index in [0..(length-1)]
      @data[index] = 0
  getWidth: () -> @width
  getHeight: () -> @height
  contains: (x, y) ->
    x >= 0 && x < @width && y >= 0 && y < @height
  setPixel: (x, y, value) ->
    if(@contains(x, y))
      @data[x + y * @width] = value
  getPixel: (x, y) ->
    if(@contains(x, y))
      @data[x + y * @width]
    else
      0

module.exports = Selection
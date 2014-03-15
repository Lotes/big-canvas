defaultWidth = 2000
defaultHeight = 2000

circle = []
radius = defaultWidth / 2
length = Math.ceil(2 * Math.PI * radius)
for index in [1..length]
  angle = 2 * Math.PI * index / length
  circle.push([Math.floor(radius * Math.cos(angle)), Math.floor(radius * Math.sin(angle))])

rectangle = [
  [100, 100],
  [100, 1900],
  [1900, 1900],
  [1900, 100]
]

random = []
for index in [1..length]
  random.push([Math.floor(defaultWidth*Math.random()), Math.floor(defaultHeight*Math.random())])

module.exports = { circle, rectangle, random }
package org.bigcanvas.data

class BoundingBox {
  private var empty = true
  private var minX = 0
  private var minY = 0
  private var maxX = 0
  private var maxY = 0
  def isEmpty = empty
  def getMinX = minX
  def getMinY = minY
  def getMaxX = maxX
  def getMaxY = maxY
  def add(point: Point) = {
    if(empty) {
      empty = false;
      minX = point.x;
      maxX = point.x;
      minY = point.y;
      maxY = point.y;
    } else {
       minX = Math.min(minX, point.x)
       minY = Math.min(minY, point.y)
       maxX = Math.max(maxX, point.x)
       maxY = Math.max(maxY, point.y)
    }
  }
  def add(line: List[Point]) {
    for(point <- line)
      add(point)
  }
  def intersects(bbox: BoundingBox): Boolean = {
    if(minX > bbox.maxX) return false
    if(maxX < bbox.minX) return false
    if(minY > bbox.maxY) return false
    if(maxY < bbox.minY) return false
    true
  }  
}
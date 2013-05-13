package org.bigcanvas.data

import org.bigcanvas.Config

class TileWindow(origin: Point, pixelWidth: Int, pixelHeight: Int) {
  val leftTop = new Point(origin.x - pixelWidth / 2, origin.y - pixelHeight / 2).toLocation
  val rightBottom = new Point(origin.x + pixelWidth / 2, origin.y + pixelHeight / 2).toLocation
  val width = rightBottom.column - leftTop.column + 1
  val height = rightBottom.row - leftTop.row + 1
  def intersects(line: List[Point]) = {
    val boundingBox = new BoundingBox()
    boundingBox.add(line)
    val windowBox = toBoundingBox
    boundingBox.intersects(windowBox)
  }
  def toBoundingBox = {
    val result = new BoundingBox()
    val size = Config.TILES_SIZE 
    val left = leftTop.column * size
    val top = leftTop.row * size
    val right = (rightBottom.column + 1) * size - 1
    val bottom = (rightBottom.row + 1) * size - 1
    result.add(new Point(left, top))
    result.add(new Point(left, bottom))
    result.add(new Point(right, top))
    result.add(new Point(right, bottom))
    result
  }
}
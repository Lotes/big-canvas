package org.bigcanvas.data
import org.bigcanvas.Config

case class Point(val x: Int, val y: Int) {
  def toLocation = {
    val size = Config.TILES_SIZE
    var col = if(x >= 0) x/size else x/size-1
    var row = if(y >= 0) y/size else y/size-1
    new TileLocation(col, row)
  }
  def toRelative(location: TileLocation): Point = {
    val size = Config.TILES_SIZE
    new Point(x - size * location.column, y - size * location.row)
  }
}
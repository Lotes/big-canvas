package org.bigcanvas.data

case class TileLocation(val column: Int, val row: Int) {
  def toFileName = 
    column.toString+"_"+row.toString+".png"
  def toData = Map[String, Any](
      "column" -> column,
      "row" -> row
  )
}
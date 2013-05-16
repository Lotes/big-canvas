package org.bigcanvas.sockets
import org.bigcanvas.handlers.UserSocket
import org.webbitserver.WebSocketConnection
import org.bigcanvas.handlers.UserSocketFactory
import org.bigcanvas.data.TileLocation
import org.bigcanvas.data.Point
import org.bigcanvas.data.TileWindow
import org.bigcanvas.data.TileWindow
import org.bigcanvas.data.BigCanvas
import java.util.ArrayList
import java.awt.Color
import org.bigcanvas.sockets.BigCanvasSocket$
import java.util.LinkedHashMap

object BigCanvasSocketFactory extends UserSocketFactory {
  override def createSocket(socket: WebSocketConnection) = new BigCanvasSocket(socket)
}

private object BigCanvasSocket {
  private var sockets = List[BigCanvasSocket]() 
  
  private def toData(line: List[Point]): List[Map[String, Any]] = { 
    var result = List[Map[String, Any]]()
    for(point <- line)
      result ++= List(Map(
        "x" -> point.x,
        "y" -> point.y
      ))
    result
  }
  private def toData(color: Color): String = { 
    "#" + Integer.toHexString((color.getRGB() & 0xffffff) | 0x1000000).substring(1)
  }
  
  def register(socket: BigCanvasSocket) { sockets ++= List(socket) }
  def unregister(socket: BigCanvasSocket) { sockets -= socket }
  
  def drawLine(who: BigCanvasSocket, line: List[Point], color: Color) {
    BigCanvas.draw(line, color)
    for(socket <- sockets.filter(a => a!=who && (a.getWindow == null || a.getWindow.intersects(line))))
      socket.send("draw", Map(
        "line" -> toData(line),
        "color" -> toData(color)
      ));
  }
}

class BigCanvasSocket(socket: WebSocketConnection) extends UserSocket(socket) {  
  private var window: TileWindow = null
  def getWindow = window
  
  private def toColor(string: String): Color = {
    val pattern = "#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})".r
    string match {
      case pattern(r,g,b) =>
        val red = Integer.parseInt(r, 16)
        val green = Integer.parseInt(g, 16)
        val blue = Integer.parseInt(b, 16)
        val color = new Color(red, green, blue)
        color
      case _ =>
        throw new Exception("Invalid color format: "+string)
    }
  }
  
  private def toLine(list: ArrayList[LinkedHashMap[String, Any]]): List[Point] = {
    var result = List[Point]()
    var it = list.iterator
    while(it.hasNext) {
      val data = it.next
      val x = data.getField[Int]("x")
      val y = data.getField[Int]("y")
      result = result ++ List(new Point(x, y))
    }
    result
  }
  
  private def setWindow(origin: Point, width: Int, height: Int) {
    val newWindow = new TileWindow(origin, width, height)
    if(window == null || window.leftTop != newWindow.leftTop || window.rightBottom != newWindow.rightBottom)
    {
      window = newWindow
      send("update", Map(
        "location" -> window.leftTop.toData,
        "tiles" -> BigCanvas.availableTiles(window)
      ))
    }
  }
  
  BigCanvasSocket.register(this)
  observePacket("move", (data) => {
    val originX = data.getField[Int]("origin.x")
    val originY = data.getField[Int]("origin.y")
    val width = data.getField[Int]("width")
    val height = data.getField[Int]("height")
    setWindow(new Point(originX, originY), width, height)
  })
  observePacket("draw", (data) => {
    val list = data.getField[ArrayList[LinkedHashMap[String, Any]]]("line")
    val line = toLine(list)
    val color = toColor(data.getField[String]("color"))
    BigCanvasSocket.drawLine(this, line, color)
  })
  observeClose(() => {
    BigCanvasSocket.unregister(this)
  })
}
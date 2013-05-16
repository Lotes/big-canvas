package org.bigcanvas.data

object LineWalker {
  def walk(p0: Point, p1: Point, plot: (Point) => Unit) = {
    //http://de.wikipedia.org/wiki/Bresenham-Algorithmus
    var x0 = p0.x
    var y0 = p0.y
    val x1 = p1.x
    val y1 = p1.y
    val dx = Math.abs(x1 - x0)
    val sx = if(x0 < x1) 1 else -1
    val dy = Math.abs(y1 - y0)
    val sy = if(y0 < y1) 1 else -1
    var err = dx - dy
    var e2 = 0
    plot(new Point(x0, y0))
    do {
      if(x0!=x1 || y0!=y1) {
        e2 = 2 * err
        if (e2 > -dy) {
          err -= dy 
          x0 += sx 
        }
        if(x0!=x1 || y0!=y1)
          if (e2 < dx) {
            err += dx 
            y0 += sy 
          }
      }
      plot(new Point(x0, y0))
    } while(x0!=x1 || y0!=y1)
  }
}
package org.bigcanvas.data

import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO
import org.bigcanvas.Config
import java.awt.Color
import scala.util.Random
import scala.actors.Actor
import scala.actors.TIMEOUT

object BigCanvas extends Actor {
  val tilesCache = new TilesCache()
  start
  
  def getTile(location: TileLocation) = tilesCache.get(location)
  
  def availableTiles(window: TileWindow): List[List[Boolean]] = {
    var result = List[List[Boolean]]()
    for(h <- 0 until window.height) {
      var row = List[Boolean]()
      for(w <- 0 until window.width) {
        val location = new TileLocation(window.leftTop.column + w, window.leftTop.row + h)
        row = row ++ List(Tile.exists(location))
      }
      result = result ++ List(row)
    }
    result
  }
  
  def draw(points: List[Point], color: Color) {
    var from: Point = null
    for(to <- points) {
      if(from != null) {
        val tiles = tilesCache.getIntersections(from, to)
        for(tile <- tiles) {
          var drawn = false
          while(!drawn) {
            try {
              if(!tile.isLoaded)
                if(tile.exists)
                  tile.load
                else
                  tile.empty
              val s = from.toRelative(tile.location)
              val t = to.toRelative(tile.location)
              tile.drawLine(s, t, color)
              drawn = true
            } catch {
              case e =>
                tilesCache.unloadOneTile
            }
          }
        }
      }
      from = to
    }
  }
  
  def act {
    loop {
      reactWithin(Config.TILES_SAVING_TIMEOUT) {
        case TIMEOUT => 
          tilesCache.save
      }
    }
  }
}

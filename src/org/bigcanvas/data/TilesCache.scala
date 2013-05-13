package org.bigcanvas.data

import java.awt.image.BufferedImage
import java.io.File
import javax.imageio.ImageIO
import org.bigcanvas.Config
import java.awt.Color
import scala.util.Random

class TilesCache {
  private val random = new Random()
  private var tiles = Map[TileLocation, Tile]()
  
  def get(location: TileLocation) = {
    tiles.get(location) match {
      case None =>
        val tile = new Tile(location)
        tiles += location -> tile
        tile
      case Some(tile) =>
        tile
    }
  }
  
  def getIntersections(from: Point, to: Point): Set[Tile] = {
    var locations = Set[TileLocation]()
    LineWalker.walk(from, to, { locations += _.toLocation })
    locations.map(get(_))
  }
  
  def unloadOneTile {
    val loaded = tiles.filter(_._2.isLoaded)
    if(loaded.size == 0)
      throw new Exception("Can not unload any tiles!")
    val index = random.nextInt(loaded.size)
    val tile = loaded.drop(index).first._2
    tile.unload
  }
  
  def save {
    val unsaved = tiles.filter(t => t._2.isLoaded && !t._2.isSaved)
    unsaved.map(_._2.save)
  }
}

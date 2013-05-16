package org.bigcanvas.data
import java.awt.image.BufferedImage
import java.io.File
import org.bigcanvas.Config
import javax.imageio.ImageIO
import java.awt.Color

object Tile {  
  private val tilesFolder = new File(Config.TILES_PATH)
  tilesFolder.mkdir()
  def exists(location: TileLocation): Boolean = {
    val filename = location.toFileName
    val file = new File(Tile.tilesFolder, filename)
    file.exists
  }
}

class Tile(val location: TileLocation) {
  private var image: BufferedImage = null
  private var loaded = false
  private var saved = false
  
  def isLoaded = loaded
  def isSaved = saved
  def exists = Tile.exists(location)
  
  def toFile = new File(Tile.tilesFolder, location.toFileName)
  
  def drawLine(from: Point, to: Point, color: Color) {
    require(loaded, "image must be loaded!")
    saved = false
    val graphics = image.getGraphics
    graphics.setColor(color)
    graphics.drawLine(from.x, from.y, to.x, to.y)
  }
  
  def load() {
    require(!loaded, "image must not be loaded!")
    image = ImageIO.read(new File(Tile.tilesFolder, location.toFileName))
    loaded = true
    saved = true
  }
  
  def unload() {
    require(loaded, "image must be loaded!")
    save
    image = null
    loaded = false
  }
  
  def empty {
    val size = Config.TILES_SIZE
    val bitmap = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB)
    val graphics = bitmap.getGraphics()
    graphics.setColor(new Color(0,0,0,0))
    graphics.fillRect(0, 0, size, size)
    loaded = true
    saved = false
    image = bitmap
  }
  
  def save() {
    require(loaded, "image must be loaded!")
    if(saved)
      return
    ImageIO.write(image, "png", toFile)
    saved = true
  }
  
  def toBoundingBox = {
    val result = new BoundingBox()
    val size = Config.TILES_SIZE 
    val left = location.column * size
    val top = location.row * size
    val right = (location.column + 1) * size - 1
    val bottom = (location.row + 1) * size - 1
    result.add(new Point(left, top))
    result.add(new Point(left, bottom))
    result.add(new Point(right, top))
    result.add(new Point(right, bottom))
    result  
  }
}
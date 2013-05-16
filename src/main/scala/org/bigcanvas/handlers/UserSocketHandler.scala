package org.bigcanvas.handlers

import org.webbitserver._
import org.bigcanvas.utils.DataReader
import com.codahale.jerkson.Json

class UserSocket(socket: WebSocketConnection) extends DataReader {
  require(socket!=null)
  
  private type CloseCallback = () => Unit
  private var closeCallbacks: List[CloseCallback] = List()
  def observeClose(callback: CloseCallback) {
    closeCallbacks ::= callback
  }
  
  type Data = Map[String, Any]
  private type PacketCallback = (Data) => Unit
  private var packetCallbacks: Map[String, PacketCallback] = Map()
  protected def observePacket(kind: String, callback: PacketCallback) {
    packetCallbacks += kind -> callback
  }
  private def handlePacket(kind: String, data: Map[String, Any]) {
    packetCallbacks(kind)(data)
  }
  
  protected def send(kind: String, data: Map[String, Any]) {
    val string = Json.generate(data + ("kind" -> kind))
    socket.send(string)
  }

  def handleMessage(message: String) {
    //parse
    var packet: Data = null
    try {
      packet = Json.parse[Data](message)
    } catch {
      case e: Exception =>
        println("Invalid format: "+message)
        close
        return
    }
    //handle
    try {
      val kind = packet.getField[String]("kind")
      handlePacket(kind, packet)
    } catch {
      case e: Exception =>
        println("Invalid packet ("+e.getMessage+"): "+packet)
        close
    }
  }  
  def handleClose() { closeCallbacks.foreach(_()) }
  def close { socket.close }
}

/**
 * a factory that produces UserSockets by a WebSocketConnection
 */
abstract class UserSocketFactory {
  def createSocket(socket: WebSocketConnection): UserSocket
}

/**
 * a general websocket handler
 */
class UserSocketHandler(val factory: UserSocketFactory) extends BaseWebSocketHandler {
  private var connections: Map[WebSocketConnection, UserSocket] = Map()
  
  override def onOpen(connection: WebSocketConnection) {
    val socket = factory.createSocket(connection)
    connections += (connection -> socket)
  }

  override def onClose(connection: WebSocketConnection) {
    connections.get(connection) match {
      case None =>
        println("Invalid connection!")
        connection.close()
      case Some(socket) =>
        println("Closing socket!")
        socket.handleClose();
        connections -= connection
    }
  }

  override def onMessage(connection: WebSocketConnection, message: String) {
    connections.get(connection) match {
      case None =>
        println("Invalid connection!")
        connection.close()
      case Some(socket) =>
        socket.handleMessage(message)
    }
  }
}
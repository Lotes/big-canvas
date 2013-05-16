package org.bigcanvas

import org.webbitserver._
import org.webbitserver.handler.StaticFileHandler
import java.io.File
import com.codahale.jerkson.Json._
import org.bigcanvas.sockets.BigCanvasSocketFactory
import org.bigcanvas.handlers.UserSocketHandler
import org.bigcanvas.handlers.TilesRoutesHandler

object Main {
  def main(args: Array[String]) {
    val webServer = WebServers.createWebServer(8080)
        .add(new StaticFileHandler(Config.WEBSERVER_PATH))
        .add(new TilesRoutesHandler)
        .add("/"+Config.WEBSOCKET_PATH, new UserSocketHandler(BigCanvasSocketFactory))
    webServer.start
    println("Server running at " + webServer.getUri())
  }
}
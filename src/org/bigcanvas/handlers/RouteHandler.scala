package org.bigcanvas.handlers

import org.webbitserver.HttpHandler
import org.webbitserver.HttpRequest
import org.webbitserver.HttpResponse
import org.webbitserver.HttpControl
import java.util.regex.Pattern
import com.codahale.jerkson._
import org.bigcanvas.utils.DataReader
import org.bigcanvas.data.TileLocation
import org.bigcanvas.data.BigCanvas
import java.io.InputStream
import java.io.FileInputStream

class RouteParameters {
  private var params = Map[String, String]()
  def add(name: String, value: String) { params += name -> value }
  def getInt(name: String) = try { 
    Integer.parseInt(params.getOrElse(name, "0"))
  } catch {
    case e: Exception => 
      0
  }
  def getString(name: String) = params.getOrElse(name, "")
}

class Route(_route: String, callback: (RouteParameters, HttpRequest, HttpResponse) => Unit) {
  val route = _route
  private val pattern = Pattern.compile(":([a-zA-Z]+)")
  private val matcher = pattern.matcher(route)
  private var parameterNames = List[String]()
  //get all parameter names
  while(matcher.find)
    parameterNames ++= List(matcher.group(1))
  //generate regular expression
  var uriRegExp = Pattern.compile(matcher.replaceAll("(\\.+)"))
  def execute(request: HttpRequest, response: HttpResponse): Boolean = {
    val uri = request.uri
    val matcher = uriRegExp.matcher(uri)
    if(!matcher.find()) //TODO check for exactly match, not only the prefix
      return false
    val params = new RouteParameters
    for(index <- 1 to matcher.groupCount()) {
      val name = parameterNames(index-1)
      val value = matcher.group(index)
      params.add(name, value)
    }
    callback(params, request, response)
    true
  }
}

class AdvancedHttpResponse(response: HttpResponse) {
  def asJson(obj: Map[String, Any]) {
    response.header("Content-type", "application/json")
            .content(Json.generate(obj))
            .end();
  }
  def asJson(success: Boolean, message: String, obj: Map[String, Any]) {
    var msg = Map[String, Any]()
    msg ++= obj
    msg += "success" -> success
    msg += "message" -> message
    asJson(msg)
  }
  def asJson(successMessage: String, obj: Map[String, Any]) {
    asJson(true, successMessage, obj)
  }
}

class RouteHandler extends HttpHandler with DataReader {
  private var routes = List[Route]()
  protected def addRoute(route: String, callback: (RouteParameters, HttpRequest, HttpResponse) => Unit) {
    routes ++= List(new Route(route, callback))
  }
  
  implicit def advanceRequest(request: HttpRequest): DataObject = {
    val obj = Json.parse[Map[String, Any]](request.body)
    new DataObject(obj) 
  }
  implicit def advanceResponse(response: HttpResponse): AdvancedHttpResponse = new AdvancedHttpResponse(response)
  
  override def handleHttpRequest(request: HttpRequest, response: HttpResponse, control: HttpControl) {
    for(route <- routes)
      try {
        if(route.execute(request, response))
          return
      } catch {
        case e: Exception =>
          response.asJson(Map(
              "success" -> false,
              "message" -> e.getMessage
          ))
      }
    control.nextHandler();
  }
}

class TilesRoutesHandler extends RouteHandler {
  addRoute("/tiles/:column_:row\\.png", (params, request, response) => {
    val col = params.getInt("column")
    val row = params.getInt("row")
    val location = new TileLocation(col, row)
    val tile = BigCanvas.getTile(location)
    if(!tile.exists) {
      if(!tile.isLoaded)
        tile.empty
    }
    if(!tile.isLoaded)
        tile.load
    if(!tile.isSaved)
      tile.save
    val in = new FileInputStream(tile.toFile)
    val bytes = new Array[Byte](in.available())
    in.read(bytes);
    in.close();
    response
      .header("Cache-Control", "no-cache")
      .content(bytes)
      .end
  })
}

/*
addRoute("/users/activate/:email/:activationKey", (params, request, response) => {
    val email = params.getString("email")
    val activationKey = params.getString("activationKey")
    UserDao.activate(email, activationKey)
    response.asJson("User was activated.", Map())
  })
*/
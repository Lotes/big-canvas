package org.bigcanvas.utils
import java.util.LinkedHashMap

trait DataReader {
  implicit def dataToObject(data: Map[String, Any]) = new DataObject(data) 
  implicit def javaDataToObject(data: LinkedHashMap[String, Any]) = {
    var map = Map[String, Any]()
    val it = data.keySet.iterator
    while(it.hasNext) {
      val key = it.next
      val value = data.get(key)
      map += key -> value
    }
    new DataObject(map)
  }
  class DataObject(val data: Map[String, Any]) {
     /**
     * reads a field with a given type from the data object
     * @throws an exception if field could not be found or type mismatches
     * @returns the content of the requested field with the given type
     */
    def getField[T](path: String): T = {
      val names = if(path.contains(".")) path.split('.') else Array(path)
      val folders = names.take(names.length-1)
      val lastField = names.last
      var obj = data
      var currentPath: List[String] = List()
      //move through the hierarchy
      for(folder <- folders) {
        obj.get(folder) match {
          case None =>
            throw new Exception("Field '"+folder+"' not found at '"+(currentPath mkString "/")+"'.")
          case Some(map: LinkedHashMap[String, Any]) =>
            var m = Map[String, Any]()
            val it = map.keySet.iterator
            while(it.hasNext)
            {
              val key = it.next
              val value = map.get(key)
              m += key -> value
            }
            obj = m
          case Some(map: Map[String, Any]) =>
            obj = map
            currentPath = currentPath ++ List(folder)
          case Some(otherwise) =>
            throw new Exception("Expected object, but "+otherwise.getClass.getName+" found at '"+(currentPath mkString "/")+"/"+folder+"'.")
        }
      }
      //check for the last field
      obj.get(lastField) match {
        case Some(t: T) =>
          return t
        case None =>
          throw new Exception("Field '"+lastField+"' not found at '"+(folders mkString "/")+"'.")
        case otherwise =>
          throw new Exception("Unexpected type at '"+(folders mkString "/")+"/"+lastField+"'.")
      }
    } 
  }
}
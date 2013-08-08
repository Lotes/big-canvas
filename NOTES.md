NOTES
=====

Objekte in big-canvas:
* Users                                          ==> users/<userId>
* Sessions                                       ==> sessions/<sessionId>

* Actions (userId, region, undone, type, stroke, width, color, opacity) ==> actions/<actionId>

* Tiles (actionIds)                              ==> tiles/<column>:<row>
* (Tile)Versions (actionsBitString, picturePath) ==> versions/<revision>@<column>:<row>
* (Tile)Deltas (picturePath)                     ==> deltas/<actionId>@<column>:<row>

* Jobs (siehe unten)

* Images (x,y,width,height,backgroundColor?)     ==> images/<imageId>

Jobs:
* Job-Scheduling sollte vollkommen über die Datenbank laufen, damit bei einem Absturz des Servers die Jobs weitergeführt werden können
* Render-Job (tileLocation, actionIds, dependencies to other jobs?)
* Delta-Job (actionId)

Routen:
*  /tiles/:column_:row.png
  *  schlägt die Kachel im private/tiles-Ordner nach und gibt sie aus, falls sie existiert, oder sendet leere Kachel falls nicht
  *  im Arbeitspeicher cachen
*  /images/:id
  *  schlägt das Bild im private/images-Ordner nach
  *  dort ist in einer Datei x/y/width/height hinterlegt
  *  außerdem die Anzahl der Zugriffe
  *  im Arbeitspeicher cachen
  *  maximale Beschränkung 4096x4096?

Andere Ideen
* Websocket-Antworten je Benutzer sammeln (Batch-Antwort alle 500ms)
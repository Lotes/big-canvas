NOTES
=====

Objekte
-------

```
* Users                                          ==> users/<userId>
* Sessions                                       ==> sessions/<sessionId>

* Actions (userId, region, undone, type, stroke, width, color, opacity) ==> actions/<actionId>

* Tiles (actionIds)                              ==> tiles/<column>:<row>
* (Tile)Versions (actionsBitString, picturePath) ==> versions/<revision>@<column>:<row>
* (Tile)Deltas (picturePath)                     ==> deltas/<actionId>@<column>:<row>

* Jobs (siehe unten)

* Images (x,y,width,height,backgroundColor?)     ==> images/<imageId>
```

Jobs
----

```
* Job-Scheduling sollte vollkommen über die Datenbank laufen, damit bei einem Absturz des Servers die Jobs weitergeführt werden können
* Render-Job (tileLocation, actionIds, dependencies to other jobs?)
* Delta-Job (actionId)
   * produziert am Ende Render-Jobs
   * benachrichtigt am Ende alle Sockets über die neue Aktion
```


Aktionen
--------

BRUSH/ERASER-Aktion:
* wenn Linienzug > BoundingBox(4096x4096) => Fehler
* BoundingBox zu Region umrechnen um betroffenes Gebiet abzuschätzen
* betroffene Kacheln als ungültig markieren (=> Meldung an die Nutzer)
* großes Delta darauf zeichnen
* Delta in Kacheldeltas aufsplitten
* Delta speichern (PNGs und DB-Einträge)
* betroffene Kacheln neu rendern (=> Meldung an die Nutzer über den Fortschritt)
* Aktions-Bit-String aller betroffenen Kacheln aktualisieren (String notwendig)?
* Kacheln als gültig markieren (=> Meldung an die Nutzer)
Was ist mit den Versionen?

UNDO/REDO-Aktion:
* lade Region der zu ändernden Aktion
* betroffene Kacheln als ungültig markieren (=> Meldung an die Nutzer)
* BitString der Kacheln aktualisieren
* suche Version mit längsten gemeinsamen Aktions-Bit-String
* Meldung an die Nutzer

* verstichene Zeit zum Zeichnen mitprotokollieren
* in gewissen Zeitabständen Versionen speichern
* Canvases serverseitig cachen

Routen
------
*  /images/:id
  *  schlägt das Bild im private/images-Ordner nach
  *  dort ist in einer Datei x/y/width/height hinterlegt
  *  außerdem die Anzahl der Zugriffe
  *  im Arbeitspeicher cachen
  *  maximale Beschränkung 4096x4096?

Andere Ideen
------------
* Websocket-Antworten je Benutzer sammeln (Batch-Antwort alle 500ms)

Grafiken
--------
* http://openiconlibrary.sourceforge.net/gallery2/?./Icons/actions&200
* Radierer, Pinsel, Undo, Redo
* Ladebild, Nicht-verfügbar-Bild
* Undo-Manager-Icon
  * Mini-Pinsel mit verwendeten Farbe
  * Mini-Radierer
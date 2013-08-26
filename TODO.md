# TODO

## v0.2?
* zu Node.js konvertieren
* Session-Expiration-Datum berücksichtigen
* Bildlink-Generator (/images/u8Ik1lwz --> x/y/width/height)
* 32-bit-Begrenzung aufheben (endlose Karte --> big-integer)
* transparenter Pinsel + Radierer mit einstellbarer Breite
* Standardtool soll "Verschieben" sein
* Undo/Redo pro Benutzer (Strg+Z)
* Touch-Events für iPad/Handys
* UNDO/REDO in Transaktionen packen
* teste Zeichnen für große Koordinaten
* Websocket-Antworten je Benutzer sammeln (Batch-Antwort alle 500ms)
* eigenes Webdesign: http://openiconlibrary.sourceforge.net/gallery2/?./Icons/actions&200
* verstichene Zeit zum Zeichnen mitprotokollieren
* in gewissen Zeitabständen Versionen speichern
* Canvases serverseitig cachen

### Server
* Delta/Version-Cache
* Schema für Versionen
  * col,row
  * //revisionId NULL
  * bitString
  * canvasId NULL
  * path NULL
  * usageCount
  * lastUsage

### Client
* bei sendAction-Fehler, Canvas löschen
* sonst auf onAction-Event warten
* je Kachel Aktionsverlauf speichern
  * falls Unterbrechung durch Bewegen oder skalieren, dann bei UNDO immer auf Server warten
* Busy-Animation (Pinsel beim Zeichnen)


## v0.3
* mehrere Ebenen (max. 5)
* Bilder hochladen und positionieren
* Undo/Redo für beliebigen Benutzer
* Aktionsliste für Region
* Onlineliste für Region
* Selektion und Füllen
* Kommentarfunktion

## v0.x
* verteiltes System, mehrere Rechner
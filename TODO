TODO
====

v0.2?
-zu Node.js konvertieren
-Session-Expiration-Datum berücksichtigen
-Bildlink-Generator (/images/u8Ik1lwz --> x/y/width/height)
-32-bit-Begrenzung aufheben (endlose Karte --> big-integer)
-transparenter Pinsel + Radierer mit einstellbarer Breite
-Standardtool soll "Verschieben" sein
-Undo/Redo pro Benutzer (Strg+Z)
-Undo/Redo für beliebigen Benutzer
-Aktionsliste für Region
-Touch-Events für iPad/Handys
-Onlineliste für Region

v0.3?
-mehrere Ebenen (max. 5)
-Bilder hochladen und positionieren

v0.x?
-verteiltes System, mehrere Rechner

NOTIZEN
=======

Routen:
- /tiles/:column_:row.png
  - schlägt die Kachel im private/tiles-Ordner nach und gibt sie aus, falls sie existiert, oder sendet leere Kachel falls nicht
  - im Arbeitspeicher cachen
- /images/:id
  - schlägt das Bild im private/images-Ordner nach
  - dort ist in einer Datei x/y/width/height hinterlegt
  - außerdem die Anzahl der Zugriffe
  - im Arbeitspeicher cachen
  - maximale Beschränkung 4096x4096?

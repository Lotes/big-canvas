var DatabaseScheme = require("../DatabaseScheme");
var Scheme = DatabaseScheme.Scheme;
var ColumnType = DatabaseScheme.ColumnType;

var scheme = new Scheme();

scheme
  .addTable("sessions")
    .addColumn("id", ColumnType.STRING, false, true)
    .addColumn("content")
    //link to user
    .addColumn("userId")
;

scheme
  .addTable("users")
    //identification
    .addColumn("id", ColumnType.STRING, false, true)
    .addColumn("name")
    //actions
    .addColumn("firstActionId")
    .addColumn("lastActionId")
    //statistics
    .addColumn("numBrushStrokes")
    .addColumn("numEraserStrokes")
    .addColumn("numUndos")
    .addColumn("numRedos")
;

scheme
  .addTable("actions")
    .addColumn("id", ColumnType.STRING, false, true)
    .addColumn("type")
    .addColumn("actionObject")
    .addColumn("userId")
    .addColumn("undone", ColumnType.BOOLEAN)
    .addColumn("region")
    .addColumn("timestamp", ColumnType.INTEGER)
    //links for history
    .addColumn("previousActionId")
    .addColumn("nextActionId")
;

scheme
  .addTable("deltas")
    .addColumn("column", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("actionId", ColumnType.STRING, false, true)
    .addColumn("imagePath")
;

scheme
  .addTable("images")
    .addColumn("id", ColumnType.STRING, false, true)
    .addColumn("x")
    .addColumn("y")
    .addColumn("width", ColumnType.INTEGER)
    .addColumn("height", ColumnType.INTEGER)
    .addColumn("imagePath")
;

scheme
  .addTable("tiles")
    .addColumn("column", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("isValid", ColumnType.BOOLEAN)
    .addColumn("actionBitString", ColumnType.TEXT)
    .addColumn("lastRevision", ColumnType.INTEGER)
;

scheme
  .addTable("tileActions")
    .addColumn("column", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("orderIndex", ColumnType.INTEGER, false, true)
    .addColumn("actionId")
;

scheme
  .addTable("versions")
    .addColumn("column", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("revision", ColumnType.INTEGER, false, true)
    .addColumn("actionBitString", ColumnType.TEXT)
;

module.exports = scheme;

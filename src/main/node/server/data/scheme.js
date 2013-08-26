var DatabaseScheme = require("../DatabaseScheme");
var Scheme = DatabaseScheme.Scheme;
var ColumnType = DatabaseScheme.ColumnType;

var scheme = new Scheme();

scheme
  .addTable("counters")
    .addColumn("name", ColumnType.STRING, false, true)
    .addColumn("value")
;

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
    .addColumn("actionObject", ColumnType.TEXT)
    .addColumn("userId")
    .addColumn("undone", ColumnType.BOOLEAN)
    .addColumn("region", ColumnType.TEXT)
    .addColumn("timestamp", ColumnType.INTEGER)
    //links for history
    .addColumn("previousActionId")
    .addColumn("nextActionId")
;

scheme
  .addTable("deltas")
    .addColumn("col", ColumnType.STRING, false, true)
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
    .addColumn("col", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("currentRevisionId", ColumnType.STRING, true)
    .addColumn("nextRevisionId")
;

scheme
  .addTable("tileActions")
    .addColumn("col", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("orderIndex", ColumnType.INTEGER, false, true)
    .addColumn("actionId")
;

scheme
  .addTable("versions")
    .addColumn("col", ColumnType.STRING, false, true)
    .addColumn("row", ColumnType.STRING, false, true)
    .addColumn("revisionId", ColumnType.STRING, false, true)
    .addColumn("parentRevisionId", ColumnType.STRING, true)
    .addColumn("actionId")
    .addColumn("imagePath", ColumnType.STRING, true)
    .addColumn("canvasId", ColumnType.STRING, true)
;

module.exports = scheme;

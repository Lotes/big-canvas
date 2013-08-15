var ColumnType = {
  STRING: "STRING",   //VARCHAR(255)
  INTEGER: "INTEGER", //INT (4 bytes)
  BOOLEAN: "BOOLEAN", //TINYINT (1 byte)
  TEXT: "TEXT"        //LONGTEXT
};

function Column(name, type, canBeNull, isPrimary) {
  this.getName = function() { return name; };
  this.getType = function() { return type || ColumnType.STRING; };
  this.canBeNull = function() { return canBeNull || false; };
  this.isPrimaryKey = function() { return isPrimary || false; };
}

function Table(name) {
  this.columns = {};
  this.getName = function() { return name; };
}

Table.prototype.addColumn = function(name, type, canBeNull, isPrimary) {
  var column = new Column(name, type, canBeNull, isPrimary);
  this.columns[name] = column;
  return this;
};

function Scheme() {
  this.tables = {};
}

Scheme.prototype.addTable = function(name) {
  var table = new Table(name);
  this.tables[name] = table;
  return table;
};

Scheme.prototype.createMySQLDatabase = function(client, callback) {
  var error = null;
  for(var tableName in this.tables) {
    var table = this.tables[tableName];
    var sql = "";
  }
};

module.exports = {
  Scheme: Scheme,
  ColumnType: ColumnType
};
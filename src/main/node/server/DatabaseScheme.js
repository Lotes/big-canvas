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

function columnTypeToMySQLType(type) {
  switch(type) {
    case ColumnType.STRING: return "VARCHAR(255)";
    case ColumnType.BOOLEAN: return "TINYINT";
    case ColumnType.INTEGER: return "INT";
    case ColumnType.TEXT: return "LONGTEXT";
    default: throw new Error("Unknown type: "+type);
  }
}

function join(list, separator) {
  var result = "";
  for(var i=0; i<list.length; i++) {
    if(i==0)
      result = list[0];
    else
      result += separator + list[i];
  }
  return result;
}

Scheme.prototype.createMySQLDatabase = function(client, callback) {
  var error = null;
  var tableCount = 0;
  var finished = false;
  for(var tableName in this.tables) {
    var table = this.tables[tableName];
    tableCount++;
    (function(table) {
      var tableName = table.getName();
      client.query("DROP TABLE IF EXISTS "+tableName, [], function(err) {
        if(err) {
          error = err;
          console.log(err.message);
        }
        var columns = [],
          primaries = [];
        for(var columnName in table.columns) {
          var column = table.columns[columnName];
          var nullPhrase = column.canBeNull() ? "NULL" : "NOT NULL";
          var typePhrase = columnTypeToMySQLType(column.getType());
          if(column.isPrimaryKey())
            primaries.push(columnName);
          columns.push(columnName+" "+typePhrase+" "+nullPhrase);
        }
        columns.push("PRIMARY KEY ("+join(primaries, ", ")+")");
        var sql = "CREATE TABLE "+tableName+" ("+join(columns, ", ")+")";
        client.query(sql, [], function(err) {
          if(err) {
            error = err;
            console.log(err.message);
          }
          tableCount--;
          if(tableCount == 0 && finished) {
            if(error)
              callback(error);
            else
              callback();
          }
        });
      });
    })(table);
  }
  finished = true;
};

module.exports = {
  Scheme: Scheme,
  ColumnType: ColumnType
};
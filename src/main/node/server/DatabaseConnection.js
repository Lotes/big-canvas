var Config = require("./Config");
var mysql = require('mysql');
var queues = require('mysql-queues');

module.exports = function() {
  var connection = mysql.createConnection({
    host     : Config.DATABASE_HOST,
    user     : Config.DATABASE_USERNAME,
    password : Config.DATABASE_PASSWORD,
    database : Config.DATABASE_NAME
  });
  queues(connection, false);
  return connection;
};
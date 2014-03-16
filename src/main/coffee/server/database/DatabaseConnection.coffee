config = require("../Config")
mysql = require('mysql')
queues = require('mysql-queues')

module.exports = (multipleStatements) ->
  multipleStatements = multipleStatements || false
  connection = mysql.createConnection({
    host     : config.DATABASE_HOST,
    user     : config.DATABASE_USERNAME,
    password : config.DATABASE_PASSWORD,
    database : config.DATABASE_NAME,
    supportBigNumbers: true,
    bigNumberStrings: true,
    multipleStatements: multipleStatements
  })
  queues(connection, false)
  connection

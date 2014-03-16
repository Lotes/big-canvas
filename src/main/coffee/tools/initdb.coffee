fs = require("fs")
DatabaseConnection = require("../server/database/DatabaseConnection");
connection = new DatabaseConnection(true)

connection.connect((err) ->
  #handle error
  if(err)
    connection.end()
    throw err
  #create scheme
  fs.readFile(__dirname + "/../../sql/schema.sql", "utf-8", (err, data) ->
    if(err)
      connection.end()
      throw err
    connection.query(data, [], (err) ->
      if(err)
        connection.end()
        throw err
      connection.end()
    )
  )
)
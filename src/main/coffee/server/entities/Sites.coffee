{ SiteType } = require("../../rpc/big-canvas")

module.exports = {
  create: (connection, col, row, isReadOnly, callback) -> #returns id
  get: (connection, siteId, callback) ->
    #returns mode, column, row if site exists or else an error
    connection.query("SELECT readOnly, col, row FROM sites WHERE id=? LIMIT 1", [siteId], (err, results) ->
      if(err)
        callback(err)
        return
      if(results.length == 0)
        callback(new Error("There is no site named '"+siteId+"'."))
        return
      result = results[0]
      mode = if(result.readOnly)then SiteType.READ_ONLY else SiteType.WRITABLE
      column = result.col
      row = result.row
      callback(null, mode, column, row)
    )
}
AwarenessProcess = require("../../../../main/js/server/awareness/AwarenessProcess")
expect = require("expect.js")

describe("AwarenessProcess", ->
  describe("#login(clientId, userId, siteType, siteId, callback)", ->
    it('should do...', (done) ->
      manager = new AwarenessProcess({})
      manager.login("123", "456", 0, "abc", (err) ->
        if(err)
          throw err
        done()
      )
    )
  )
)
config = require("../../../main/js/server/Config")
AwarenessManager = require("../../../main/js/server/AwarenessManager")
expect = require("expect.js")

describe("AwarenessManager", ->
  describe("#setSite", ->
    it("should return an error on setting unknown site", (done) ->
      manager = new AwarenessManager()
      manager.addClient(config.DEMO_USER_ID, (err, clientId) ->
        if(err)
          throw err
        manager.setSite(clientId, "unknown", (err, mode) ->
          expect(err).not.to.be(null)
          done()
        )
      )
    )
  )
)
config = require("../../../main/js/server/Config")
AwarenessManager = require("../../../main/js/server/AwarenessManager")
expect = require("expect.js")
_ = require("underscore")

loginAndSetSiteAndWindow = (manager, userId, siteId, window, done) ->
  manager.addClient(userId, (err, clientId) ->
    expect(err).to.be(null)
    manager.setSite(clientId, siteId, (err, mode) ->
      expect(err).to.be(null)
      manager.setWindow(clientId, window, (err) ->
        expect(err).to.be(null)
        done()
      )
    )
  )

describe("AwarenessManager", ->
  describe("#setSite", ->
    it("should return an error on setting unknown site", (done) ->
      manager = new AwarenessManager()
      manager.addClient(config.DEMO_USER_ID, (err, clientId) ->
        expect(err).to.be(null)
        manager.setSite(clientId, "unknown", (err, mode) ->
          expect(err).not.to.be(null)
          done()
        )
      )
    )
    it("should return not an error on setting known site", (done) ->
      manager = new AwarenessManager()
      manager.addClient(config.DEMO_USER_ID, (err, clientId) ->
        expect(err).to.be(null)
        manager.setSite(clientId, config.DEMO_SITE, (err, mode) ->
          expect(err).to.be(null)
          done()
        )
      )
    )
  )

  describe("#setWindow", ->
    userWindow = ["0", "0", 400, 300]
    it("should return an error if site is not set", (done) ->
      manager = new AwarenessManager()
      manager.addClient(config.DEMO_USER_ID, (err, clientId) ->
        expect(err).to.be(null)
        manager.setWindow(clientId, userWindow, (err) ->
          expect(err).not.to.be(null)
          done()
        )
      )
    )
    it("should return different user windows for different sites", (done) ->
      windows = [
        ["-128", "-128", 400, 300],
        ["128", "128", 400, 300]
      ]
      count = windows.length
      manager = new AwarenessManager()
      manager.on("windowChanged", (receiver, client, window) ->
        _.each(windows, (result) ->
          if(_.isEqual(result, window))
            count--
            if(count == 0)
              done()
        )
      )
      loginAndSetSiteAndWindow(manager, config.DEMO_USER_ID, config.DEMO_SITE, userWindow, ->
        loginAndSetSiteAndWindow(manager, config.DEMO_USER_ID, config.DEMO_SITE2, userWindow, ->
        )
      )
    )
  )
)
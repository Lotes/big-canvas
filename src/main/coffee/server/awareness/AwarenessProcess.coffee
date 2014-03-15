cp = require('child_process')
{ AwarenessWorker } = require("../../rpc/big-canvas")
ClientStub = AwarenessWorker.ClientStub

class AwarenessProcess extends ClientStub
  constructor: (implementations) ->
    child = cp.fork(__dirname + "/main.js")
    child.on('message', (message) =>
      @receive(message)
    )
    implementations = implementations || {}
    implementations.send = (object) =>
      child.send(object)
    super(implementations)

module.exports = AwarenessProcess
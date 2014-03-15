AwarenessManager = require("./awareness/AwarenessProcess")

console.log("awarenesss manager start")
manager = new AwarenessProcess({})
console.log("awarenesss manager started")
manager.login("123", "456", 0, "abc", (err) ->
  console.log("awarenesss manager login")
  if(err)
    throw err
)

###Worker = require("webworker-threads").Worker

worker = new Worker( ->
  @postMessage("I'm working before postMessage('ali').")
  @onmessage = (event) =>
    @postMessage('Hi ' + event.data)
    @close()
)
worker.onmessage = (event) ->
  console.log("Worker said: " + event.data)
worker.postMessage('ali')
###
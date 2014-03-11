Worker = require("webworker-threads").Worker

worker = new Worker( ->
  @postMessage("I'm working before postMessage('ali').")
  @onmessage = (event) =>
    @postMessage('Hi ' + event.data)
    @close()
)
worker.onmessage = (event) ->
  console.log("Worker said: " + event.data)
worker.postMessage('ali')

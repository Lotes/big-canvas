mutexes = {}

class Mutex
  constructor: ->
    @locked = false
    @queue = []
  acquire: (fn) ->
    if(@locked)
      @queue.push(fn)
    else
      @locked = true
      fn()
  release: ->
    @locked = false
    if(@queue.length > 0)
      fn = @queue.shift()
      @aquire(fn)

module.exports = (key, callback) ->
  if(!mutexes[key])
    mutexes[key] = new Mutex()
  mutex = mutexes[key]
  mutex.acquire(->
    callback(->
      mutex.release()
    )
  )

###
Usage:
  lock("lockName", (done) ->
    #do something
    done()
  )
###
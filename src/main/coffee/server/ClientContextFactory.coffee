class ClientContext
  constructor: (socket, userId) ->
  #socket
  #site
  #window
  #color
  #tool
  #layer
  #userId

class ClientContextFactory
  constructor: ->
  createContext: (socket, userId, callback) ->

module.exports = new ClientContextFactory()
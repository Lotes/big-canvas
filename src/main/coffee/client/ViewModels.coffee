{ Logger } = require("../logging/Logger")

logger = new Logger("ViewModels")

class UserViewModel extends kb.ViewModel
  constructor: (model, options) ->
    super()
    @name = kb.observable(model, "name")
    @color = kb.observable(model, "color")

class AnnotationViewModel extends kb.ViewModel
  constructor: (model, options) ->
    super()
    @title = kb.observable(model, "title")
    factory = new kb.Factory()
    factory.addPathMapping("author", UserViewModel)
    @author = kb.observable(model, { key: "author", factory: factory })

class AnnotationsViewModel
  constructor: (collection) ->
    @collection = kb.collectionObservable(collection, {
      factories: {
        "models": AnnotationViewModel
      }
    })
  open: null
  close: null

###
class PostViewModel
  like: null
  unlike: null
###

module.exports = { AnnotationsViewModel }
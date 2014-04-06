{ Annotation, AnnotationCollection, Post, PostCollection } = require("./models")
{ Logger } = require("../logging/Logger")
{ PaginationViewModel } = require("./PaginationViewModel")
{ TransitionMachine } = require("./TransitionMachine")
moment = require("moment")

logger = new Logger("ViewModels")

class UserViewModel extends kb.ViewModel
  constructor: (model, options) ->
    super()
    @id = kb.observable(model, "id")
    @name = kb.observable(model, "name")
    @color = kb.observable(model, "color")

class AnnotationViewModel extends kb.ViewModel
  constructor: (model, options) ->
    super()
    @title = kb.observable(model, "title")
    factory = new kb.Factory()
    factory.addPathMapping("author", UserViewModel)
    @author = kb.observable(model, { key: "author", factory: factory })
    @createdAt = kb.observable(model, "createdAt")
    @createdAtFormatted = ko.computed(() =>
      moment(@createdAt()).fromNow()
    )
    @postsCount = model.get("posts").length
    @authorClick = =>
      alert("user "+@author().id())
    @annotationClick = =>
      alert("annotation "+model.get("id"))

class AnnotationsViewModel
  constructor: (collection) ->
    @panels = new TransitionMachine({
      annotations: "#annotations-panel",
      posts: "#posts-panel"
    }, "annotations")
    @annotations = new PaginationViewModel(collection, {
      filter: (model) -> true #TODO filter visibles
      viewModel: AnnotationViewModel,
      collectionClass: AnnotationCollection,
      comparator: (model) ->
        -model.get("createdAt").getTime()
    })
    @gotoPosts = => @panels.goto("posts")
    @gotoAnnotations = => @panels.goto("annotations")
    ko.applyBindings(this, $("#comments-region")[0])

module.exports = { AnnotationsViewModel }
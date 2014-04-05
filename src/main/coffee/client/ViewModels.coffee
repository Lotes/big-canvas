{ Annotation, AnnotationCollection, Post, PostCollection } = require("./models")
{ Logger } = require("../logging/Logger")
{ PaginationViewModel } = require("./PaginationViewModel")
moment = require("moment")

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
    @createdAt = kb.observable(model, "createdAt")
    @createdAtFormatted = ko.computed(() =>
      moment(@createdAt()).fromNow()
    )

class AnnotationsViewModel
  constructor: (collection) ->
    @collection = kb.collectionObservable(collection, {
      factories: {
        "models": AnnotationViewModel
      }
    })
    @annotations = new PaginationViewModel(collection, {
      filter: (model) -> true #TODO filter visibles
      viewModel: AnnotationViewModel,
      collectionClass: AnnotationCollection,
      comparator: (model) ->
        -model.get("createdAt").getTime()
    })
  openAnnotation: (annotationId) ->
    #go to post view for the given annotation
    #load post data
  closeAnnotation: ->
    #close and go back to annotation overview

###
class PostViewModel
  like: null
  unlike: null
###

module.exports = { AnnotationsViewModel }
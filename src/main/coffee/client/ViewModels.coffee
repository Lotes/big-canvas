class AnnotationsViewModel
  constructor: (collection) ->
    @collection = kb.collectionObservable(collection, {view_model: kb.ViewModel})
  open: null
  close: null

###
class PostViewModel
  like: null
  unlike: null
###

module.exports = { AnnotationsViewModel }
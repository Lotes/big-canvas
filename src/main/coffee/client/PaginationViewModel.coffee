{ Annotation, AnnotationCollection, Post, PostCollection } = require("./models")

class PaginationViewModel
  constructor: (collection, @options) ->
    if(!@options.filter)
      @options.filter = -> true
    if(!@options.viewModel)
      @options.viewModel = kb.ViewModel
    @pageNumber = ko.observable(0)
    @perPageCount = 5
    @pagesCount = ko.observable(0)
    @totalPages = ko.observableArray([])
    @allCollection = collection
    @filteredCollection = new AnnotationCollection()
    @pageCollection = new AnnotationCollection()
    @allCollection.on("change", => @update())
    @filteredCollection.on("change", => @updatePage())
    @pageNumber.subscribe(=> @updatePage())
    @paginated = kb.collectionObservable(@pageCollection, {
      factories: {
        "models": @options.viewModel
      }
    })
    @hasPrevious = ko.computed(=>
      return @pageNumber() != 0
    )
    @hasNext = ko.computed(=>
      return @pageNumber() < @pagesCount() - 1
    )
    @next = =>
      if(@pageNumber() < @pagesCount() - 1)
        @pageNumber(@pageNumber() + 1)
    @previous = =>
      if(@pageNumber() != 0)
        @pageNumber(@pageNumber() - 1)
    @update()
  update: ->
    @filteredCollection.reset(@allCollection.filter(@options.filter))
  updatePage: ->
    first = @pageNumber() * @perPageCount
    items = @filteredCollection.slice(first, first + @perPageCount)
    @pageCollection.reset(items)
    @updatePagination()
  updatePagination: ->
    div = Math.floor(@filteredCollection.size() / @perPageCount)
    div += if(@filteredCollection.size() % @perPageCount == 0)then 0 else 1
    @pagesCount(div)
    pageClick = (page) => return => @pageNumber(page)
    min = Math.max(0, @pageNumber() - 2)
    max = Math.min(div-1, @pageNumber() + 2)
    result = []
    if(div > 0)
      for page in [min..max]
        result.push({
          page: page+1,
          pageClick: pageClick(page),
          selected: @pageNumber() == page
        })
    @totalPages(result)

module.exports = { PaginationViewModel }
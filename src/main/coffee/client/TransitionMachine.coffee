class TransitionMachine
  constructor: (selectorsByName, startName) ->
    @selectors = {}
    for key, value of selectorsByName
      @selectors[key] = $(value)
    @lastName = null
    @currentName = startName
    @last = null
    @current = @selectors[@currentName]
    #hide all others boxes
    for key, value of @selectors
      value.addClass("hidden")
    @current.removeClass("hidden")
  goto: (nextName) ->
    if(@currentName == nextName || !@selectors[nextName]? )
      return
    time = 400
    perspective = "600px"
    next = @selectors[nextName]
    @current
      .css("z-index", 1000)
      .transition({
        perspective: perspective,
        rotateY: "0deg"
      }, 0)
      .removeClass("hidden")
      .transition({
        perspective: perspective,
        rotateY: "-180deg"
      }, time)
    next
      .css("z-index", 2000)
      .transition({
        perspective: perspective,
        rotateY: "180deg"
      }, 0)
      .removeClass("hidden")
      .transition({
        perspective: perspective,
        rotateY: "0deg"
      }, time)
    if(@last != null && nextName != @lastName)
        @last.addClass("hidden")
    @last = @current
    @current = next
    @lastName = @currentName
    @currentName = nextName

module.exports = { TransitionMachine }
#config = require("../Config")
{ Logger } = require("../logging/Logger")
ConsoleAppender = require("../logging/ConsoleAppender")
{ Client } = require("./Client")
{ AnnotationCollection } = require("./models")
{ AnnotationsViewModel } = require("./viewModels")

Logger.addAppender(new ConsoleAppender())
logger = new Logger("main")

$(->
  annotations = new AnnotationCollection()
  annotationsViewModel = new AnnotationsViewModel(annotations)
  ko.applyBindings(annotationsViewModel, $("#annotations")[0])

  client = new Client(siteId) #siteId will be set by the template
  client.on("initialized", ->
    logger.info("initialized")
    client.setWindow(["-1000", "-1000", 2000, 2000], (err) ->
      if(err)
        logger.error("Could not set window: "+err.message)
      else
        logger.debug("window set!")
    )
  )
  client.on("windowChanged", (clientId, window) ->
    logger.debug(window.toData())
  )
  client.on("annotationChanged", (annotationIds) ->
    for annotationId in annotationIds
      client.getAnnotation(annotationId, (err, annotation) ->
        if(err)
          logger.error(err.message)
          return
        annotations.push(annotation)
        logger.debug("annotation '"+annotation.title+"' added")
      )
  )
)
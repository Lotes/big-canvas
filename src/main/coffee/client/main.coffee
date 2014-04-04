#config = require("../Config")
{ Logger } = require("../logging/Logger")
ConsoleAppender = require("../logging/ConsoleAppender")
{ Client } = require("./Client")
{ AnnotationCollection, Annotation } = require("./models")
{ AnnotationsViewModel } = require("./viewModels")
{ UserManager } = require("./UserManager")

Logger.addAppender(new ConsoleAppender())
logger = new Logger("main")

$(->
  annotations = new AnnotationCollection()
  annotationsViewModel = new AnnotationsViewModel(annotations)
  ko.applyBindings(annotationsViewModel, $("#annotations")[0])

  client = new Client(siteId) #siteId will be set by the template
  users = new UserManager(client)

  getAnnotation = (annotationId) ->
    annotation = annotations.get(annotationId)
    if(!annotation)
      annotation = annotations.push({ id: annotationId })
    client.getAnnotation(annotationId, (err, data) ->
      if(!err)
        data.author = users.get(data.authorId)
        date = new Date()
        date.setTime(data.createdAt)
        data.createdAt = date
        annotation.set(data)
      else
        logger.error("getting annotation: "+err.message)
    )
    return annotation

  client.on("initialized", (clientId, userId, readOnly) ->
    logger.info("initialized as user "+userId+", site is "+(if(readOnly)then "read only" else "writable" ))
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
      getAnnotation(annotationId)
  )
)
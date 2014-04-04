#config = require("../Config")
{ Logger } = require("../logging/Logger")
ConsoleAppender = require("../logging/ConsoleAppender")
{ Client } = require("./Client")
{ AnnotationCollection, Annotation, User, UserCollection } = require("./models")
{ AnnotationsViewModel } = require("./viewModels")

Logger.addAppender(new ConsoleAppender())
logger = new Logger("main")

$(->
  users = new UserCollection()
  annotations = new AnnotationCollection()
  annotationsViewModel = new AnnotationsViewModel(annotations)
  ko.applyBindings(annotationsViewModel, $("#annotations")[0])

  client = new Client(siteId) #siteId will be set by the template

  getUser = (userId) ->
    user = users.get(userId)
    if(!user)
      user = users.push({ id: userId })
      client.getUserByUserId(userId, (err, data) ->
        if(!err)
          user.set({
            name: data[1],
            color: data[2]
          })
        else
          logger.error("getting user: "+err.message)
      )
    return user

  getAnnotation = (annotationId) ->
    annotation = annotations.get(annotationId)
    if(!annotation)
      annotation = annotations.push({ id: annotationId })
    client.getAnnotation(annotationId, (err, data) ->
      if(!err)
        data.author = getUser(data.authorId)
        date = new Date()
        date.setTime(data.createdAt)
        data.createdAt = date
        annotation.set(data)
      else
        logger.error("getting annotation: "+err.message)
    )
    return annotation

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
      getAnnotation(annotationId)
  )
)
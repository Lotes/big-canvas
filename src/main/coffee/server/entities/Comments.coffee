

module.exports = {
  getAnnotationsInWindow: (connection, userWindow, callback) ->
    xMin = userWindow.x.toString()
    yMin = userWindow.y.toString()
    xMax = userWindow.x.add(userWindow.width).minus(1).toString()
    yMax = userWindow.y.add(userWindow.height).minus(1).toString()
    connection.query("SELECT id FROM annotations WHERE x>=? AND x<=? AND y>=? AND y<=?", [xMin, xMax, yMin, yMax], (err, results) ->
      if(err)
        callback(err)
        return
      result = []
      for annotation in results
        result.push(annotation.id)
      callback(null, result)
    )
  getAnnotation: (connection, annotationId, userId, callback) ->
    connection.query("SELECT title, x, y FROM annotations WHERE id=? LIMIT 1", [annotationId], (err, results) ->
      if(err)
        callback(err)
        return
      if(results.length == 0)
        callback(new Error("Invalid annotation id!"))
        return
      annotation = results[0]
      connection.query("SELECT id, authorId, createdAt FROM posts WHERE annotationId=? ORDER BY createdAt", [annotationId], (err, results) ->
        if(err)
          callback(err)
          return
        first = results[0]
        postIds = []
        for post in results
          postIds.push(post.id)
        connection.query("SELECT 1 FROM annotationReads WHERE annotationId=? AND userId=?", [annotationId, userId], (err, results) ->
          if(err)
            callback(err)
            return
          readAnno = results.length == 1
          console.log("DATE: "+first.createdAt)
          callback(null, {
            $type: "Annotation",
            id: annotationId,
            title: annotation.title,
            position: [annotation.x, annotation.y],
            posts: postIds,
            authorId: first.authorId,
            createdAt: new Date(first.createdAt).getTime()
            read: readAnno
          })
        )
      )
    )
  getPost: (connection, postId, callback) ->
    connection.query("SELECT authorId, text, createdAt FROM posts WHERE id=? LIMIT 1", [postId], (err, results) ->
      if(err)
        callback(err)
        return
      if(results.length == 0)
        callback(new Error("Invalid post id!"))
        return
      post = results[0]
      connection.query("SELECT userId FROM postLikes WHERE postId=? ORDER BY likedAt DESC", [postId], (err, results) ->
        if(err)
          callback(err)
          return
        likingUsers = []
        for user in results
          likingUsers.push(user.userId)
        callback(null, {
          $type: "Post",
          id: postId,
          authorId: post.authorId,
          text: post.text,
          createdAt: new Date(post.createdAt).getTime(),
          likingUsers: likingUsers
        })
      )
    )
}
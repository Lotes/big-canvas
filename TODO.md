# TODO

## v0.3
* switch language to coffee script
* review architecture
* multiple layers (max. 5)
* set temporary layer opacity
* move opacity to tool options, not to "color"
* insert tool preview
* filter actions (only send actions to the client which he does not own)
* add tool cursors
* insert Streberkraken
* navigator
* fix "too many connections" error when moving client's window
* take a look at the session expiration date
* test big coordinates
* test why window resize fails displaying drawing scene

## v0.4
* read-only mode
* comments
* tables
  * comments (id, timestamp, userId, message)
  * commentPins (col, row, x, y, commentId)
  * commentRelations (commentId, parentCommentId, depth)
  * commentReads (commentId, userId)
  * commentLikes (commentId, userId)

## v0.5
* live and static images

## v0.6
* selection and fill tools

## v0.7
* copy & paste

## v0.8
* upload images

## v0.x
* any-undo
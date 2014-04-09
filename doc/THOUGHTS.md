= THOUGHTS =
* read more papers about group ware
* make an own paper about the internals and design decisions of big canvas
* when does the server draw the tiles?
  * should be only done when they were requested (static or live images or undo command or initial tile loading)
  * need a publish-subscribe solution
* which tile revisions should the server store on hard disk and which can be discarded?
* rethink the hierarchal structure of revisions and actions
  * use child-parent-relation table with links to all parents (quadratic space, but easy search queries)
  * may introduce an abstract layer to try more solutions
* when to lock the canvas?
  * currently it is locked foreach action
  * but by locking only the local region a higher throughput could be achieved
* add more tools beside eraser, brush and the HARMONY brushes
  * select tool
  * mouse pointer? (== move tool)
  * comment tool
  * smudge tool
  * fill bucket
* how to do error recovery when server-side drawing fails?
* more test cases!
  * do integration test by setting up server, sending draw actions and analyzing responses
* how to report awareness?
  * send mouse position
  * send tool and stroke information
  * send selection region
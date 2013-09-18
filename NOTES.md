* line tool
* airbrush tool
* stamp functionality
* library per user (uploaded images files, own static and live images, readonly points)

```
type RevisionId = BigInteger
struct Revision {
	revisionId: RevisionId;
	actionId: ActionId;
	available: Boolean;
}
type Revisions = list of Revision

enum UpdateType {
  RENDERED,
  HISTORY,
  ACTION
}

struct Update {
  type: UpdateType match {
    case ACTION:
	  actionId: ActionId;
	  action: Action;
	  userId: UserId; //executor
    case RENDERED:
      location: TileLocation; //which revisions are avaiblable now?
      revisionId: RevisionId;
    case HISTORY:
      location: TileLocation;
      baseRevisionId: RevisionId;
      tailRevisions: Revisions;
  };
}
type Updates = list of Update

interface Main {
	function requestActions(actionIds: ActionIds);
	function sendAction(action: Action): ActionId;
	function sendWindow(x: BigInteger; y: BigInteger; 
	  width: WindowWidth; height: WindowHeight);
	event onUpdate(updates: Updates);
}

/*
-login
-sendWindow(x,y,w,h)
-onUpdate(us) --> history for each tile
-requestActions(as)
-onUpdate(us) --> actions
-draw
-ready!
*/
```

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
	  userId: UserId;
    case RENDERED:
      location: TileLocation;
      revisionId: RevisionId;
	case HISTORY:
	  location: TileLocation;
	  baseRevisionId: RevisionId; //empty or available
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
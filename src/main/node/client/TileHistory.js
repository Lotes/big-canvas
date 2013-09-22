var _ = require("underscore");

function Revision(id) {
  var parent = null,
      available = false,
      actionId = null;
  this.isEmpty = function() { return id == "-1"; };
  this.getActionId = function() { return actionId; };
  this.setActionId = function(value) { actionId = value; };
  this.getParent = function() { return parent; };
  this.setParent = function(value) { parent = value; };
  this.getAvailable = function() { return available; };
  this.setAvailable = function(value) { available = value; };
}

function TileHistory() {
  var self = this,
      revisions = {},
      head = null;

  this.getHeadRevision = function() { return head; };

  this.addRevision = function(id, actionId) {
    if(!(id in revisions))
      revisions[id] = new Revision(id);
    var revision = revisions[id];
    if(actionId)
      revision.setActionId(actionId);
    return revision;
  };

  this.addNewBranch = function(historyUpdate) {
    var base = this.addRevision(historyUpdate.baseRevisionId);
    base.setAvailable(true);
    head = base;
    _.each(historyUpdate.tailRevisions, function(tailRevision) {
      var revision = self.addRevision(tailRevision.revisionId, tailRevision.actionId);
      revision.setAvailable(tailRevision.available);
      revision.setParent(head);
      head = revision;
    });
  };
}

module.exports = TileHistory;
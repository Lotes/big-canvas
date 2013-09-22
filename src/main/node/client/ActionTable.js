function Action(actionId, action, userId) {
  this.getId = function() { return actionId; };
  this.getAction = function() { return action; };
  this.getUserId = function() { return userId; };
}

function ActionTable() {
  var actions = {};
  this.add = function(actionUpdate) {
    var id = actionUpdate.actionId;
    if(!(id in actions))
      actions[id] = new Action(id, actionUpdate.action, actionUpdate.userId);
    return actions[id];
  };
  this.contains = function(id) {
    return id in actions;
  };
  this.get = function(id) {
    return actions[id];
  };
}

module.exports = ActionTable;
var _ = require("underscore");
var BigInteger = require("big-integer");

function getActionOrderIndex(client, location, actionId, callback) {
  client.query("SELECT orderIndex FROM tileActions WHERE col=? AND row=? AND actionId=? LIMIT 1",
    [location.column, location.row, actionId], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) callback(new Error("Action has no effect on this tile."));
    else callback(null, results[0].orderIndex);
  });
}

function getPreviousActionByOrderIndex(client, location, orderIndex, callback) {
  client.query("SELECT a.id AS id FROM tileActions ta INNER JOIN actions a ON ta.actionId=a.id "+
    "WHERE ta.col=? AND ta.row=? AND ta.orderIndex<? AND a.undone=0 ORDER BY ta.orderIndex DESC LIMIT 1",
    [location.column, location.row, orderIndex], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) callback();
    else callback(null, results[0].id);
  });
}

function getTailActionIds(client, location, orderIndex, callback) {
  client.query("SELECT a.id AS id FROM tileActions ta INNER JOIN actions a ON ta.actionId=a.id "+
    "WHERE ta.col=? AND ta.row=? AND ta.orderIndex>=? AND a.undone=0 ORDER BY ta.orderIndex ASC",
    [location.column, location.row, orderIndex], function(err, results)
  {
    if(err) { callback(err); return; }
    callback(null, _.map(results, function(result) { return result.id; }));
  });
}

function getTile(client, location, callback) {
  client.query("SELECT currentRevisionId, nextRevisionId FROM tiles WHERE col=? AND row=? LIMIT 1",
    [location.column, location.row], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) callback();
    else callback(null, {
      currentRevisionId: results[0].currentRevisionId,
      nextRevisionId: results[0].nextRevisionId
    });
  });
}

function setTile(client, location, currentRevisionId, nextRevisionId, callback) {
  client.query("SELECT 1 FROM tiles WHERE col=? AND row=? LIMIT 1",
    [location.column, location.row], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) {
      client.query("INSERT INTO tiles (col, row, currentRevisionId, nextRevisionId) VALUES (?,?,?,?)",
        [location.column, location.row, currentRevisionId, nextRevisionId], function(err)
      {
        if(err) callback(err);
        else callback();
      });
    } else {
      client.query("UPDATE tiles SET currentRevisionId=?, nextRevisionId=? WHERE col=? AND row=?",
        [currentRevisionId, nextRevisionId, location.column, location.row], function(err, result)
      {
        if(err) { callback(err); return; }
        if(result.affectedRows == 0) callback(new Error("Tile could not be updated."));
        else callback();
      });
    }
  });
}

function getParentVersion(client, location, revisionId, callback) {
  client.query("SELECT parentRevisionId FROM versions WHERE col=? AND row=? AND revisionId=? LIMIT 1",
    [location.column, location.row, revisionId], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) { callback(new Error("No parent version found.")); return; }
    callback(null, results[0].parentRevisionId);
  });
}

function getBaseRevision(client, location, revisionId, baseActionId, callback) {
  if(baseActionId == null || revisionId == null) {
    callback(null, null);
    return;
  }
  function step(revisionId) {
    client.query("SELECT actionId FROM versions WHERE col=? AND row=? AND revisionId=? LIMIT 1",
      [location.column, location.row, revisionId], function(err, results)
    {
      if(err) { callback(err); return; }
      if(results.length == 0) { callback(new Error("Revision does not exist.")); return; }
      if(results[0].actionId == baseActionId) {
        callback(null, revisionId);
        return;
      }
      getParentVersion(client, location, revisionId, function(err, parentRevisionId) {
        if(err) { callback(err); return; }
        step(parentRevisionId);
      });
    });
  }
  step(revisionId);
}

/**
 * @method addVersion
 * @param client
 * @param location
 * @param nextRevisionIdGenerator
 * @param parentRevisionId
 * @param actionId
 * @param callback {Function(err, revisionId)}
 */
function addVersion(client, location, nextRevisionIdGenerator, parentRevisionId, actionId, callback) {
  //does a version with that parent and that action already exist?
  client.query("SELECT revisionId FROM versions WHERE col=? AND row=? AND parentRevisionId=? AND actionId=? LIMIT 1",
    [location.column, location.row, parentRevisionId, actionId], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 1)
      //yes, return revision id
      callback(null, results[0].revisionId);
    else {
      //no, generate a new version and return the new revision id
      var revisionId = nextRevisionIdGenerator();
      client.query("INSERT INTO versions (col, row, revisionId, parentRevisionId, actionId, imagePath, canvasId)"+
        "VALUES (?,?,?,?,?,?,?)", [location.column, location.row, revisionId, parentRevisionId, actionId, null, null],
      function(err) {
        if(err) callback(err);
        else callback(null, revisionId);
      });
    }
  });
}

function updateTileHistory(client, location, actionId, callback) {
  getActionOrderIndex(client, location, actionId, function(err, actionIndex) {
    if(err) { callback(err); return; }
    //console.log("order index of action "+actionId+" is "+actionIndex);
    getPreviousActionByOrderIndex(client, location, actionIndex, function(err, baseActionId) {
      if(err) { callback(err); return; }
      //console.log("previous action is "+baseActionId);
      getTailActionIds(client, location, actionIndex, function(err, tailActionIds) {
        if(err) { callback(err); return; }
        //console.log("tail actions are ", tailActionIds);
        getTile(client, location, function(err, tile) {
          if(err) { callback(err); return; }
          if(tile == null)
            tile = {
              currentRevisionId: null,
              nextRevisionId: "0"
            };
          //console.log("tile: ", tile);
          var nextRevisionId = BigInteger(tile.nextRevisionId);
          function generateNextRevisionId() {
            var result = nextRevisionId.toString();
            nextRevisionId = nextRevisionId.next();
            return result;
          }
          getBaseRevision(client, location, tile.currentRevisionId, baseActionId, function(err, baseRevisionId) {
            if(err) { callback(err); return; }
            //console.log("base revision is "+baseRevisionId);
            var parentRevisionId = baseRevisionId;
            var tailIndex = 0;
            function step() {
              if(tailIndex >= tailActionIds.length) {
                setTile(client, location, parentRevisionId, nextRevisionId.toString(), function(err) {
                  if(err) callback(err);
                  else callback();
                  //console.log("updated tile");
                });
              } else {
                var actionId = tailActionIds[tailIndex];
                tailIndex++;
                addVersion(client, location, generateNextRevisionId, parentRevisionId, actionId, function(err, revisionId) {
                  if(err) { callback(err); return; }
                  //console.log("added version (revId: "+revisionId+", actionId: "+actionId+")");
                  parentRevisionId = revisionId;
                  step();
                });
              }
            }
            step();
          });
        });
      });
    });
  });
}

function getFirstUndrawnVersion(client, location, callback) {
  getTile(client, location, function(err, tile) {
    if(err) { callback(err); return; }
    if(!tile || !tile.currentRevisionId) {
      //empty tile
      callback(null, {
        operationsLeft: 0,
        baseVersion: null,
        newVersion: null
      });
    } else {
      var baseVersion = null;
      var newVersion = null;
      var operationsLeft = 0;
      function step(revisionId) {
        if(revisionId == null) {
          callback(null, {
            operationsLeft: operationsLeft,
            baseVersion: null,
            newVersion: baseVersion
          });
        } else {
          client.query("SELECT parentRevisionId, actionId, imagePath, canvasId FROM versions WHERE col=? AND row=? AND revisionId=?",
            [location.column, location.row, revisionId], function(err, results)
            {
              if(err) { callback(err); return; }
              if(results.length == 0) { callback(new Error("Version does not exist.")); return; }
              newVersion = baseVersion;
              baseVersion = {
                revisionId: revisionId,
                parentRevisionId: results[0].parentRevisionId,
                actionId: results[0].actionId,
                imagePath: results[0].imagePath,
                canvasId: results[0].canvasId
              };
              if(baseVersion.imagePath == null && baseVersion.canvasId == null) {
                //bad, walk to parent version
                getParentVersion(client, location, revisionId, function(err, parentRevisionId) {
                  if(err) { callback(err); return; }
                  operationsLeft++;
                  step(parentRevisionId);
                });
              } else {
                //good, search is over
                callback(null, {
                  operationsLeft: operationsLeft,
                  baseVersion: baseVersion,
                  newVersion: newVersion
                });
              }
            });
        }
      }
      step(tile.currentRevisionId);
    }
  });
}

/**
 * Manages the "versions" table
 * @class Versions
 */
module.exports = {
  updateHistoryForRegion: function(client, region, actionId, callback) {
    var index = 0;
    function step() {
      if(index >= region.length) { callback(); return; }
      var location = region[index];
      index++;
      updateTileHistory(client, location, actionId, function(err) {
        if(err) callback(err); else step();
      });
    }
    step();
  },
  getFirstUndrawnVersion: getFirstUndrawnVersion,
  getStates: function(client, region, callback) {
    var index = 0,
        result = [];
    function step() {
      if(index >= region.length)
        callback(null, result);
      else {
        var location = region[index];
        index++;
        getFirstUndrawnVersion(client, location, function(err, state) {
          if(err) { callback(err); return; }
          state.location = location;
          result.push(state);
          step();
        });
      }
    }
    step();
  }
};

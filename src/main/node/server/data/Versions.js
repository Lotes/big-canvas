var _ = require("underscore");
var BigInteger = require("big-integer");
var Config = require("../Config");
var Canvas = require("canvas");
var Cache = require("../../Cache");
var tilesCache = new Cache(1024); //TODO move cache size to config
var fs = require("fs");
var Counters = require("./Counters");

/**
 * returns the number (index) of the given action on the given tile
 * @method getActionOrderIndex
 * @param client {MySQLClient}
 * @param location {TileLocation}
 * @param actionId {ActionId}
 * @param callback {Function(err,Integer)}
 */
function getActionOrderIndex(client, location, actionId, callback) {
  client.query("SELECT orderIndex FROM tileActions WHERE col=? AND row=? AND actionId=? LIMIT 1",
    [location.column, location.row, actionId], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 0) callback(new Error("Action has no effect on this tile."));
    else callback(null, results[0].orderIndex);
  });
}

/**
 * returns the action id before the given action index on the given tile. If there is no predecessor, nothing will be returned
 * @method getPreviousActionByOrderIndex
 * @param client
 * @param location
 * @param orderIndex
 * @param callback
 */
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
    callback(null, null, false);
    return;
  }
  function step(revisionId) {
    client.query("SELECT actionId, imagePath FROM versions WHERE col=? AND row=? AND revisionId=? LIMIT 1",
      [location.column, location.row, revisionId], function(err, results)
    {
      if(err) { callback(err); return; }
      if(results.length == 0) { callback(new Error("Revision does not exist.")); return; }
      if(results[0].actionId == baseActionId) {
        callback(null, revisionId, results[0].imagePath != null);
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
 * @param callback {Function(err, revisionId, available)}
 */
function addVersion(client, location, nextRevisionIdGenerator, parentRevisionId, actionId, callback) {
  //does a version with that parent and that action already exist?
  client.query("SELECT revisionId, imagePath FROM versions WHERE col=? AND row=? AND parentRevisionId=? AND actionId=? LIMIT 1",
    [location.column, location.row, parentRevisionId, actionId], function(err, results)
  {
    if(err) { callback(err); return; }
    if(results.length == 1)
      //yes, return revision id
      callback(null, results[0].revisionId, results[0].imagePath != null);
    else {
      //no, generate a new version and return the new revision id
      var revisionId = nextRevisionIdGenerator();
      client.query("INSERT INTO versions (col, row, revisionId, parentRevisionId, actionId, imagePath)"+
        "VALUES (?,?,?,?,?,?)", [location.column, location.row, revisionId, parentRevisionId, actionId, null],
      function(err) {
        if(err) callback(err);
        else callback(null, revisionId, false);
      });
    }
  });
}

function updateTileHistory(client, location, actionId, callback) {
  getActionOrderIndex(client, location, actionId, function(err, actionIndex) {
    if(err) { callback(err); return; }
    getPreviousActionByOrderIndex(client, location, actionIndex, function(err, baseActionId) {
      if(err) { callback(err); return; }
      getTailActionIds(client, location, actionIndex, function(err, tailActionIds) {
        if(err) { callback(err); return; }
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
          getBaseRevision(client, location, tile.currentRevisionId, baseActionId, function(err, baseRevisionId, baseAvailable) {
            if(err) { callback(err); return; }
            var parentRevisionId = baseRevisionId;
            var tailIndex = 0;
            var tail = [];
            function step() {
              if(tailIndex >= tailActionIds.length) {
                setTile(client, location, parentRevisionId, nextRevisionId.toString(), function(err) {
                  if(err) callback(err);
                  else {
                    if(baseRevisionId==null || baseAvailable)
                      callback(null, baseRevisionId!=null ? baseRevisionId : "-1", tail);
                    else {
                      tail.unshift({
                        revisionId: baseRevisionId,
                        actionId: baseActionId,
                        available: false
                      });
                      function predStep(revisionId) {
                        getParentVersion(client, location, revisionId, function(err, parentRevisionId) {
                          if(err) { callback(err); return; }
                          if(parentRevisionId == null) {
                            callback(null, "-1", tail);
                          } else {
                            client.query("SELECT actionId, imagePath FROM versions WHERE col=? AND row=? AND revisionId=? LIMIT 1",
                              [location.column, location.row, parentRevisionId], function(err, results)
                              {
                                if(err) { callback(err); return; }
                                if(results.length == 0) { callback(new Error("Unexpected: Revision parent does not exist!")); return; }
                                if(results[0].imagePath != null) {
                                  callback(null, parentRevisionId, tail);
                                } else {
                                  tail.unshift({
                                    revisionId: parentRevisionId,
                                    actionId: results[0].actionId,
                                    available: false
                                  });
                                  predStep(parentRevisionId);
                                }
                              });
                          }
                        });
                      }
                      predStep(baseRevisionId);
                    }
                  }
                });
              } else {
                var actionId = tailActionIds[tailIndex];
                tailIndex++;
                addVersion(client, location, generateNextRevisionId, parentRevisionId, actionId, function(err, revisionId, available) {
                  if(err) { callback(err); return; }
                  parentRevisionId = revisionId;
                  tail.push({
                    revisionId: revisionId,
                    actionId: actionId,
                    available: available
                  });
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

function getTileHistoryByLocation(client, location, callback) {
  getTile(client, location, function(err, tile) {
    if(err) { callback(err); return; }
    if(!tile || !tile.currentRevisionId) {
      //empty tile
      callback(null, {
        baseRevisionId: null,
        tailRevisions: []
      });
    } else {
      var versions = [];
      function step(revisionId) {
        if(revisionId == null) {
          callback(null, {
            baseRevisionId: null,
            tailRevisions: versions
          });
        } else {
          client.query("SELECT actionId, imagePath FROM versions WHERE col=? AND row=? AND revisionId=?",
            [location.column, location.row, revisionId], function(err, results)
            {
              if(err) { callback(err); return; }
              if(results.length == 0) { callback(new Error("Version does not exist.")); return; }
              var version = {
                revisionId: revisionId,
                actionId: results[0].actionId,
                available: results[0].imagePath != null
              };
              if(!version.available) {
                //bad, walk to parent version
                versions.push(version);
                getParentVersion(client, location, revisionId, function(err, parentRevisionId) {
                  if(err) { callback(err); return; }
                  step(parentRevisionId);
                });
              } else {
                //good, search is over
                callback(null, {
                  baseRevisionId: revisionId,
                  tailRevisions: versions
                });
              }
            });
        }
      }
      step(tile.currentRevisionId);
    }
  });
}

function getRevisionKey(location, revisionId) {
  return location.column+","+location.row + "@" + revisionId;
}

/**
 * Manages the "versions" table
 * @class Versions
 */
module.exports = {
  /**
   * Returns a canvas of the given tile revision. If the revision id is null, an empty canvas is returned.
   * If the revision has no path an error will be thrown!
   * @method getRevision
   * @param client
   * @param location
   * @param revisionId {RevisionId} can be null for empty tile
   * @param callback {Function(Error,Canvas)}
   */
  getRevision: function(client, location, revisionId, callback) {
    var size = Config.TILE_SIZE;
    if(revisionId == null) {
      callback(null, new Canvas(size, size));
    } else {
      client.query("SELECT imagePath FROM versions WHERE col=? AND row=? AND revisionId=? LIMIT 1",
        [location.column, location.row, revisionId], function(err, results)
      {
        if(err) { callback(err); return; }
        if(results.length == 0) { callback(new Error("Cannot find revision (column: "+location.column+"; row: "+location.row+"; revision: "+revisionId+").")); return; }
        var imagePath = results[0].imagePath;
        var canvas = tilesCache.get(getRevisionKey(location, revisionId));
        if(canvas != null) {
          callback(null, canvas);
        } else {
          canvas = new Canvas(size, size);
          fs.readFile(Config.SERVER_TILES_PATH + "/" + imagePath, function(err, buffer){
            if (err) { callback(err); return; }
            try {
              var image = new Canvas.Image();
              var g = canvas.getContext("2d");
              image.src = buffer;
              g.drawImage(image, 0, 0, size, size);
              tilesCache.set(getRevisionKey(location, revisionId), canvas);
              callback(null, canvas);
            } catch(ex) { callback(ex); }
          });
        }
      });
    }
  },
  /**
   * Saves the given canvas into a PNG image file and updates the version entry.
   * @method setRevision
   * @param client {MySQLClient}
   * @param location {TileLocation}
   * @param revisionId {RevisionId}
   * @param canvas {Canvas}
   * @param callback {Function(Error)}
   */
  setRevision: function(client, location, revisionId, canvas, callback) {
    //get new id
    Counters.lockVersionsCounter(function(done) {
      Counters.newId(client, "versions", function(err, id) {
        done();
        if(err) { callback(err); return; }
        //save image
        var fileName = id + ".png",
            out = fs.createWriteStream(Config.SERVER_TILES_PATH + "/" + fileName),
            stream = canvas.pngStream();
        stream.on("data", function(chunk){ out.write(chunk); });
        stream.on("error", function(err){
          console.log("ERROR WHILE IMAGE WRITING ", err);
          //TODO callback(err)?
        });
        stream.on("end", function(){
          client.query("UPDATE versions SET imagePath=? WHERE col=? AND row=? AND revisionId=?",
            [fileName, location.column, location.row, revisionId], function(err, result)
          {
            if(err) { callback(err); return; }
            if(result.affectedRows == 0) { callback(new Error("Could not update versions image path (c: "+location.column+"; r: "+location.row+"; v: "+revisionId+")!")); return; }
            tilesCache.set(getRevisionKey(location, revisionId), canvas);
            callback();
          });
        });
      });
    });
  },
  updateHistoryForRegion: function(client, region, actionId, callback) {
    var index = 0;
    var result = [];
    function step() {
      if(index >= region.length) {
        callback(null, result);
        return;
      }
      var location = region[index];
      index++;
      updateTileHistory(client, location, actionId, function(err, baseRevisionId, tail) {
        if(err) callback(err);
        else {
          result.push({
            type: "HISTORY",
            location: location,
            baseRevisionId: baseRevisionId!=null ? baseRevisionId : "-1",
            tailRevisions: tail
          });
          step();
        }
      });
    }
    step();
  },
  getTileHistoryByLocation: getTileHistoryByLocation,
  getTileHistoryByRegion: function(client, region, callback) {
    var index = 0,
        result = [];
    function step() {
      if(index >= region.length)
        callback(null, result);
      else {
        var location = region[index];
        index++;
        getTileHistoryByLocation(client, location, function(err, update) {
          if(err) { callback(err); return; }
          update.location = location;
          update.type = "HISTORY";
          update.baseRevisionId = update.baseRevisionId != null ? update.baseRevisionId : "-1";
          result.push(update);
          step();
        });
      }
    }
    step();
  }
};

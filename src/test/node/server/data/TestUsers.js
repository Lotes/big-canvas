var Config = require("./../../../../main/node/Config");
var Users = require("./../../../../main/node/server/data/Users");
var BigCanvasTypes = require("./../../../../main/node/server/BigCanvasDefinitions").Types;
var expect = require("expect.js");
var DatabaseConnection = require("./../../../../main/node/server/DatabaseConnection");

describe('Users', function(){
  describe('#create()', function(){
    it('should return a valid user id', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) {
          connection.end();
          throw err;
        }
        Users.create(connection, function(err, userId) {
          connection.end();
          if(err)
            throw err;
          expect(BigCanvasTypes.UserId.validate(userId)).to.be.ok();
          done();
        });
      });
    });
  });

  describe('#get(id)', function(){
    it('should return valid user data', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); throw err; }
        Users.create(connection, function(err, userId) {
          if(err) { connection.end(); throw err; }
          Users.get(connection, userId, function(err, user) {
            connection.end();
            if(err) throw err;
            expect(BigCanvasTypes.UserData.validate(user)).to.be.ok();
            done();
          });
        });
      });
    });
  });

  describe('#setName(id, name)', function(){
    it('should rename the user', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); throw err; }
        Users.create(connection, function(err, userId) {
          if(err) { connection.end(); throw err; }
          var name = "Test User";
          Users.setName(connection, userId, name, function(err) {
            if(err) { connection.end(); throw err; }
            Users.get(connection, userId, function(err, user) {
              connection.end();
              if(err) throw err;
              expect(user.name).to.be(name);
              done();
            });
          });
        });
      });
    });
  });

  describe('#setLastActionId(id, lastActionId)', function(){
    it('should set last action id', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); throw err; }
        Users.create(connection, function(err, userId) {
          if(err) { connection.end(); throw err; }
          var lastActionId = "100";
          Users.setLastActionId(connection, userId, lastActionId, function(err) {
            if(err) { connection.end(); throw err; }
            Users.get(connection, userId, function(err, user) {
              connection.end();
              if(err) throw err;
              expect(user.lastActionId).to.be(lastActionId);
              done();
            });
          });
        });
      });
    });
  });

  describe('#setFirstActionId(id, firstActionId)', function(){
    it('should set first action id', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); throw err; }
        Users.create(connection, function(err, userId) {
          if(err) { connection.end(); throw err; }
          var firstActionId = "200";
          Users.setFirstActionId(connection, userId, firstActionId, function(err) {
            if(err) { connection.end(); throw err; }
            Users.get(connection, userId, function(err, user) {
              connection.end();
              if(err) throw err;
              expect(user.firstActionId).to.be(firstActionId);
              done();
            });
          });
        });
      });
    });
  });

  describe('#incrementUsageStatistics(id, actionType)', function(){
    it('should increment an action statistic', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) { connection.end(); throw err; }
        Users.create(connection, function(err, userId) {
          if(err) { connection.end(); throw err; }
          Users.incrementUsageStatistics(connection, userId, "UNDO", function(err) {
            if(err) { connection.end(); throw err; }
            Users.get(connection, userId, function(err, user) {
              connection.end();
              if(err) throw err;
              expect(user.numUndos).to.be("1");
              done();
            });
          });
        });
      });
    });
  });
});
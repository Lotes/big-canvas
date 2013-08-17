var Config = require("./../../../../main/node/Config");
var Users = require("./../../../../main/node/server/data/Users");
var BigCanvasTypes = require("./../../../../main/node/server/BigCanvasDefinitions").Types;
var expect = require("expect.js");
var DatabaseConnection = require("./../../../../main/node/server/DatabaseConnection");

describe('Actions', function(){
  /*describe('#get(id)', function(){
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
  });*/
});
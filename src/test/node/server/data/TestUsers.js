var Config = require("./../../../../main/node/Config");
var Users = require("./../../../../main/node/server/data/Users");
var BigCanvasTypes = require("./../../../../main/node/server/BigCanvas").BigCanvasTypes;
var expect = require("expect.js");

describe('Users', function(){
  describe('#create()', function(){
    it('should return a valid user id', function(done){
      Users.create(function(err, userId) {
        if(err) throw err;
        expect(BigCanvasTypes.UserId.validate(userId)).to.be.ok();
        done();
      });
    });
  });

  describe('#get(id)', function(){
    it('should return valid user data', function(done){
      Users.create(function(err, userId) {
        if(err) throw err;
        Users.get(userId, function(err, user) {
          if(err) throw err;
          expect(BigCanvasTypes.UserData.validate(user)).to.be.ok();
          done();
        });
      });
    });
  });

  describe('#setName(id, name)', function(){
    it('should rename the user', function(done){
      Users.create(function(err, userId) {
        if(err) throw err;
        var name = "Test User";
        Users.setName(userId, name, function(err) {
          if(err) throw err;
          Users.get(userId, function(err, user) {
            if(err) throw err;
            expect(user.name).to.be(name);
            done();
          });
        });
      });
    });
  });
});
var Counters = require("./../../../../main/node/server/data/Counters");
var DatabaseConnection = require("./../../../../main/node/server/DatabaseConnection");
var BigInteger = require("big-integer");
//var expect = require("expect.js");

describe('Counters', function(){
  describe('#newId()', function(){
    it('should return an id', function(done){
      var connection = new DatabaseConnection();
      connection.connect(function(err) {
        if(err) {
          connection.end();
          throw err;
        }
        Counters.newId(connection, "test", function(err, id) {
          connection.end();
          if(err) throw err;
          BigInteger(id); //throws an error if wrong format
          done();
        });
      });
    });
  });
});
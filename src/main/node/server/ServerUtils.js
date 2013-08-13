module.exports = {
  stringify: function(obj) {
    return JSON.stringify(obj);
  },
  parse: function(str) {
    return JSON.parse(str);
  },
  stringifyMembers: function(obj) {
    var result = {};
    for(var name in obj)
      if(obj.hasOwnProperty(name))
        result[name] = JSON.stringify(obj[name]);
    return result;
  },
  parseMembers: function(obj) {
    var result = {};
    for(var name in obj)
      if(obj.hasOwnProperty(name))
        result[name] = JSON.parse(obj[name]);
    return result;
  }
};
var parser = require("./json-rpc-parser");
var Backbone = require("backbone");
var _ = require("underscore");

/* IMPORTANT:
 * - the server object handles socket objects
 * - these socket objects must have at least a "send(object)" method
 */

var Generator = function(schemeText) {
  try {
    var definitions = parser.parse(schemeText);
    //console.log(JSON.stringify(definitions, null, 2));
        
    var interfaces = {};
    var types = { //base type: BOOLEAN, STRING, FLOAT, INTEGER, VOID, STRUCT, LIST
      Boolean: {
        baseType: "BOOLEAN",
        name: "Boolean",
        validate: function(obj) { 
          return typeof(obj) === "boolean"; 
        }
      },
      String: {     
        baseType: "STRING",
        name: "String",
        validate: function(obj) { 
          return typeof(obj) === "string"; 
        }
      },
      Float: {
        baseType: "FLOAT",
        name: "Float",
        validate: function(obj) { 
          return typeof(obj) === "number"; 
        }
      },
      Integer: {
        baseType: "INTEGER",
        name: "Integer",
        validate: function(obj) { 
          return typeof(obj) === "number" 
                 && Math.floor(obj) === obj; 
        }
      },
      Void: {
        baseType: "VOID",
        name: "Void",
        validate: function(obj) { 
          return typeof(obj) === "undefined"; 
        }
      }
    };
    function resolveType(name) {
      if(name in types)
			  return types[name];
		  else
			  throw new Error("Could not resolve type '"+name+"'.");
    } 
    function resolveParameters(params) {
      var result = [];
      for(var i=0; i<params.length; i++)
        result.push({
          name: params[i].name,
          type: resolveType(params[i].type)
        });
      return result;
    }
    for(var i=0; i<definitions.length; i++) {
      var def = definitions[i];
      var name = def.name;
      if(def.typeKind != "interface") {
        //its an alias, struct or enumeration
        if(name in types)
          throw new Error("Type '"+name+"' already exists!");
        switch(def.typeKind) {
          case "enum":
            types[name] = {
              baseType: "STRING",
              name: name,
              validate: (function(values) {
                return function(obj) {
                  if(typeof(obj) !== "string")
                    return false;
                  for(var j=0; j<values.length; j++)
                    if(obj === values[j])
                      return true;
                  return false;
                };
              })(def.values)
            };
            break;
          case "alias":
            if(def.isList) {
              var elementType = resolveType(def.elementType);
              types[name] = {
                baseType: "LIST",
                name: name,
                validate: (function(elemType) {
                  return function(obj) {
                    if(typeof(obj) !== "object" || !("length" in obj))
                      return false;
                    for(var j=0; j<obj.length; j++)
                      if(!elemType.validate(obj[j]))
                        return false;
                    return true;
                  };
                })(elementType)
              };
            } else {
              var base = resolveType(def.alias);
              var baseType = base.baseType;
              var validate = base.validate;
              if(def.restriction) {
                var restriction = def.restriction;
                switch(restriction.restrictionKind) {
                  case "regex":
                    if(baseType !== "STRING")
                      throw new Error("Regular expression restriction holds only for string types (type: "+name+").");
                    validate = (function(vali, regex) {
                      return function(obj) {
                        return vali(obj) && obj.match(regex) != null;
                      };
                    })(validate, eval(restriction.regex));
                    break;
                  case "range":
                    switch(baseType) {
                      case "INTEGER":
                      case "FLOAT":
                        if(restriction.from.valueKind !== "number"
                           || restriction.to.valueKind !== "number")
                           throw new Error("Range restriction must consist of numeric limits (type: "+name+").");
                        if(restriction.from.value > restriction.to.value)
                          throw new Error("Lower limit must be smaller or equal to the upper limit (type: "+name+").");
                        validate = (function(vali, lower, upper) {
                          return function(obj) {
                            return vali(obj) && obj >= lower && obj <= upper;
                          };
                        })(validate, restriction.from.value, restriction.to.value);
                        break;
                      default:
                        throw new Error("Range restriction holds only for numeric types (type: "+name+").");
                    }
                    break;
                }
              }
              types[name] = {
                baseType: baseType,
                name: name,
                validate: validate
              };   
            }
            break;
          case "struct":
            function typeCheckMembers(members) {
              var checker = [];
              for(var j=0; j<members.length; j++) {
                var member = members[j];
                var memberName = member.name;
                var memberType = resolveType(member.type);
                var memberChecker = {
                  name: memberName,
                  type: memberType
                  //cases
                };                
                var casesChecker = [];
                if(member.match) {
                  for(var k=0; k<member.match.length; k++) {
                    var match = member.match[k];
                    var caseChecker = {};
                    if(match.value != null) {
                      switch(match.value.valueKind) {
                        case "constant": 
                          if(!memberType.validate(match.value.name))
                            throw new Error("'"+match.value.name+"' is not a member of type '"+member.type+"'.");
                          caseChecker.value = match.value.name;
                          break;
                        case "boolean":
                        case "number":
                          if(!memberType.validate(match.value.value))
                            throw new Error("'"+match.value.name+"' is not a member of type '"+member.type+"'.");
                          caseChecker.value = match.value.value;
                          break;
                      }
                    }
                    caseChecker.membersChecker = typeCheckMembers(match.members);
                    casesChecker.push(caseChecker);
                  }
                }
                memberChecker.cases = casesChecker;
                checker.push(memberChecker);
              }
              return checker;
            }
            function validateMembers(checker, object) {
              for(var m=0; m<checker.length; m++) {
                var memberChecker = checker[m];
                if(!(memberChecker.name in object))
                  return false;
                var value = object[memberChecker.name];
                if(!memberChecker.type.validate(value))
                  return false;
                for(var n=0; n<memberChecker.cases.length; n++) {
                  var caseChecker = memberChecker.cases[n];
                  if(caseChecker.value == value) {
                    if(!validateMembers(caseChecker.membersChecker, object))
                      return false;
                    break;
                  }
                }
              }
              return true;
            }
            var checker = typeCheckMembers(def.members);
            var superValidate = null;
            if(def.superType)
              superValidate = resolveType(def.superType).validate;
            types[name] = {
              baseType: "STRUCT",
              name: name,
              validate: (function(ch, vali){
                return function(obj) {
                  return (vali == null || vali(obj)) && validateMembers(ch, obj);
                };
              })(checker, superValidate)
            };
            break;
        }
      } else {
        //def is an interface
        if(name in interfaces)
          throw new Error("Interface '"+name+"' already exists!");
        //collect functions/events of interface
        var functions = {};
        for(var j=0; j<def.interfaces.length; j++) {
          var fn = def.interfaces[j];
          var functionName = fn.name;
          if(functionName in functions)
            throw new Error("Function '"+functionName+"' already exists in interface '"+name+"'!");
          switch(fn.interfaceKind) {
            case "function":
              functions[functionName] = {
                interfaceKind: "function",
                parameters: resolveParameters(fn.parameters),
                returns: resolveType(fn.returnType || "Void")
              };
              break;
            case "event":
              functions[functionName] = {
                interfaceKind: "event",
                parameters: resolveParameters(fn.parameters)
              };
              break;
          }
        }
        //=== build client ===
        //add event handler
        var client = (function(fns) {
          return function(implementations) {
            _.extend(this, Backbone.Events);
            this.sequenceNumber = 0;    
            this.callbacks = {};
            //check for event implementations
            this.eventHandlers = {};
            for(var fname in fns) {
              var fn = fns[fname];
              if(fn.interfaceKind !== "event")
                continue;
              //if event is not implemented, add a dummy implementation
              if(!(fname in implementations)) {
                console.log("Please add an implementation for event '"+fname+"'.");
                implementations[fname] = (function(nm) {
                  return function() {
                    console.log("Event '"+nm+"' was called!");
                  };
                })(fname);
              }
              //add event handler
              this.eventHandlers[fname] = implementations[fname];
            }
          };          
        })(functions);
        //add function stubs
        for(var fname in functions) {
          var fn = functions[fname];
          if(fn.interfaceKind !== "function")
            continue;
          client.prototype[fname] = (function(fname, fn) {
            //compute usage signature
            var params = [];
            for(var i=0; i<fn.parameters.length; i++) {
              var p = fn.parameters[i];
              params.push(p.name+": "+p.type.name);
            }
            var usage = "Usage: function "+fname+"("+params.join(", ")+", callback: function(err: Error, result: "+fn.returns.name+"))";
            //compute stub function            
            return function() {
              if(arguments.length != fn.parameters.length + 1
                 || typeof(arguments[arguments.length-1]) !== "function")
                throw new Error(usage);
              var callback = arguments[arguments.length-1];
              try {
                //validate parameters
                var paramsList = [];
                for(var i=0; i<fn.parameters.length; i++) {
                  var formalParam = fn.parameters[i];
                  var actualParam = arguments[i];
                  if(!formalParam.type.validate(actualParam))
                    throw new Error("Invalid argument ("+(i+1)+").");
                  paramsList.push(actualParam);
                }
                //send remote procedure call
                var seqNo = this.sequenceNumber++;
                this.callbacks[seqNo] = callback;
                this.trigger("send", {
                  type: "functionCall",
                  sequenceNumber: seqNo,
                  functionName: fname,
                  parameters: paramsList
                });
              } catch(ex) {
                callback(ex);
              }
            };
          })(fname, fn);
        }
        client.prototype.receive = function(obj) {
          try {
            switch(obj.type) {
              case "functionError":
                var seqNo = obj.sequenceNumber;
                if(!(seqNo in this.callbacks))
                  return false;
                var callback = this.callbacks[seqNo];
                delete this.callbacks[seqNo];
                callback && callback(new Error(obj.errorMessage));
                return true;
              case "functionReturn":
                var seqNo = obj.sequenceNumber;
                if(!(seqNo in this.callbacks))
                  return false;
                var callback = this.callbacks[seqNo];
                delete this.callbacks[seqNo];
                callback && callback(null, obj["returnValue"]);
                return true;
              case "eventCall":
                var eventName = obj.eventName;
                var params = obj.parameters;
                if(!(eventName in this.eventHandlers))
                  return false;
                this.eventHandlers[eventName].apply(this, params);
                return true;
            }
          } catch(ex) {
            console.log(ex);
            return false;
          }
          return false;
        };
        
        //=== build server ===
        //create function handlers
        var server = (function(fns) {
          return function(implementations) {
            var self = this;
            _.extend(this, Backbone.Events);
            //call constructor
            if(implementations.constructor)
              implementations.constructor.apply(this);
            //handle connect request
            if(implementations.connect)
              this.connect = implementations.connect;
            else
              this.connect = function(socket) {
                console.log("Socket "+socket.getId()+" connected.");
              };
            //handle disconnect request
            if(implementations.disconnect)
              this.disconnect = implementations.disconnect;
            else
              this.disconnect = function(socket) {
                console.log("Socket "+socket.getId()+" disconnected.");
              };
            //create function handlers
            this.functionHandlers = {};
            for(var fname in fns) {
              var fn = fns[fname];
              if(fn.interfaceKind !== "function")
                continue;
              //if event is not implemented, add a dummy implementation
              if(!(fname in implementations))
                throw new Error("Please add an implementation for function '"+fname+"'.");                
              //add event handler
              this.functionHandlers[fname] = (function(fn, impl) {
                //compute usage signature
                var params = [];
                for(var i=0; i<fn.parameters.length; i++) {
                  var p = fn.parameters[i];
                  params.push(p.name+": "+p.type.name);
                }
                var usage = "Usage: function "+fname+"(socket: Socket, "+params.join(", ")+", callback: function(err: Error, result: "+fn.returns.name+"))";
                //compute stub function            
                return function() {
                  if(arguments.length != fn.parameters.length + 2
                     || typeof(arguments[arguments.length-1]) !== "function")
                    throw new Error(usage);
                  var socket = arguments[0];
                  var callback = arguments[arguments.length-1];
                  try {
                    //validate parameters
                    var paramsList = [];
                    for(var i=0; i<fn.parameters.length; i++) {
                      var formalParam = fn.parameters[i];
                      var actualParam = arguments[i+1];
                      if(!formalParam.type.validate(actualParam))
                        throw new Error("Invalid argument ("+(i+1)+").");
                      paramsList.push(actualParam);
                    }
                    //validate result
                    paramsList.push(function(err, result) {
                      if(err)
                        callback(err);
                      else
                        if(fn.returns.validate(result))
                          callback(null, result);
                        else
                          callback(new Error("Invalid result ("+JSON.stringify(result)+")."));
                    });
                    //add socket
                    paramsList.unshift(socket);
                    //apply actual function
                    impl.apply(self, paramsList);
                  } catch(ex) {
                    callback(ex);
                  }
                };
              })(fn, implementations[fname]);
            }
          };          
        })(functions);
        //create receive-callback mechanism
        server.prototype.receive = function(socket, obj) {
          var self = this;
          try {
            switch(obj.type) {
              case "functionCall":
                var seqNo = obj.sequenceNumber;
                var fname = obj.functionName;
                var params = obj.parameters;
                params.unshift(socket);
                params.push(function(err, result) {
                  var answer;
                  if(err)
                    answer = {
                      type: "functionError",
                      sequenceNumber: seqNo,
                      errorMessage: err.message
                    };
                  else
                    answer = {
                      type: "functionReturn",
                      sequenceNumber: seqNo,
                      returnValue: result
                    };
                  socket.send(answer);
                });
                this.functionHandlers[fname].apply(this, params);
                return true;
            }
          } catch(ex) {
            //console.log(ex);
            return false;
          }
          return false;
        };
        //create event stubs
        for(var fname in functions) {
          var fn = functions[fname];
          if(fn.interfaceKind !== "event")
            continue;
          server.prototype[fname] = (function(fname, fn) {
            return function() {
              //validate parameters
              if(arguments.length !== fn.parameters.length + 1)
                throw new Error("Invalid number of arguments!");
              var paramsList = [];
              var socket = arguments[0];
              for(var i=0; i<fn.parameters.length; i++) {
                var formalParam = fn.parameters[i];
                var actualParam = arguments[i+1];
                if(!formalParam.type.validate(actualParam))
                  throw new Error("Invalid argument ("+(i+1)+". argument: "+JSON.stringify(actualParam)+")!");
                paramsList.push(actualParam);
              }
              //send the event
              socket.send({
                type: "eventCall",
                eventName: fname,
                parameters: paramsList
              });
            };
          })(fname, fn);
        }
        
        interfaces[name] = {
          Client: client,
          Server: server
        };
      }
    }
      
    //result
    this.Types = types;
    this.Interfaces = interfaces;
  } catch(ex) {
    console.log(ex);
  }
};

module.exports = Generator;
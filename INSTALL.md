# INSTALLATION

Here I describe how to install and run "big-canvas" and its dependencies. It is actually the documentation of the "makefile".

## Software
The platform is node.js, so install "nodejs" and its package manager "npm".
```
apt-get install nodejs npm
```

You will also need a MySQL server:
```
apt-get install mysql-server
```

## Node modules

The following modules must be installed in the root directory with `npm install <module-name>`.

* `express` for the web server
* `ws` for the web socket connection
* `cookie-signature` for resolving the session for the web socket connection
* `canvas` for server-side drawing
* `ejs` is the template engine for the web server (actually not really used)
* `big-integer` for operating on arbitrary big numbers
* `underscore` and `backbone` as utility library
* `mysql` for the MySQL support
* `mysql-queues` for MySQL transactions support
* `expect.js` for testing purpose

## Node tools

Some node modules must be installed in your system to use them in the command line interpreter.

* `pegjs` - PEG is a parser generator. big-canvas uses an own remote procedure call protocol which is based on an own data definition file. For this file a parser is needed. `pegjs` parses the grammar file, generates the parser which generates the RPC protocol.
* `browserify` - The client side is also written in the form of node modules. Browserify writes all used modules into one Javascript file which forms the client code file.
* `mocha` is a test framework. It must be applied to the test case node files.
* `yuidocjs` generates a documentation out of the node code.

## Tools

big-canvas comes with some own tools. You have to apply `chmod +x <script-name>` on them to execute them. The tools lie in the `src/main/node/tools` folder.

* `stringify` is needed to transform the RPC definition file into a node module. `stringify` simply puts the file as a string into the `module.exports` variable. 
* `initdb` initializes the database with a scheme for big-canvas.

## Database

The database configuration can be found in `src/main/node/server/Config.js`. The default is:
```javascript
Config.DATABASE_HOST = "localhost";
Config.DATABASE_USERNAME = "root";
Config.DATABASE_PASSWORD = "";
Config.DATABASE_NAME = "bigcanvas";
```
Before you can use big-canvas initialize the database with `make init-database`.

## Run

To start big-canvas just execute `make run` and visit `http://localhost:8080`.
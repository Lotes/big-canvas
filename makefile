all:
	make build-definition
	make build-parser
	make build-client
	make run

dependencies:
	apt-get install nodejs npm mysql-server
	npm install express@3.3.4 canvas@1.0.4 ws@0.4.27 cookie-signature@1.0.1 ejs@0.8.4 big-integer@1.1.5 underscore@1.5.1 backbone@1.0.0 mysql@2.0.0-alpha8 mysql-queues@1.0.0 expect.js@0.2.0
	npm install -g browserify pegjs mocha yuidocjs

init-database:
	./src/main/node/tools/initdb

build-doc:
	yuidoc src/main/node/

build-definition:
	./src/main/node/tools/stringify ./src/main/node/rpc/big-canvas.types ./src/main/node/rpc/big-canvas.js

build-parser:
	pegjs --track-line-and-column src/main/node/rpc/json-rpc.grammar src/main/node/rpc/json-rpc-parser.js

build-client:
	browserify src/main/node/client/main.js -o public/bigcanvas.js

run:
	node src/main/node/server/main.js

test:
	mocha src/test/node/TestTypes.js \
	      src/test/node/server/data/TestCounters.js \
	      src/test/node/server/data/TestUsers.js \
	      src/test/node/server/data/TestActions.js \
	      src/test/node/rpc/TestGenerator.js
all:
	build-definition build-parser build-client run

dependencies:
	apt-get install nodejs npm
	npm install canvas ws cookie-signature ejs big-integer underscore backbone mysql mysql-queues expect.js
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

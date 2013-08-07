all:
	build-parser build-client run

dependencies:
	apt-get install nodejs npm redis-server
	npm install canvas ws cookie-signature ejs path big-integer underscore backbone redis expect.js redis-lock
	npm install -g browserify pegjs mocha yuidocjs

build-doc:
	yuidoc src/main/node/

build-parser:
	pegjs --track-line-and-column src/main/node/rpc/json-rpc.grammar src/main/node/rpc/json-rpc-parser.js

build-client:
	browserify src/main/node/client/main.js -o public/bigcanvas.js

run:
	node src/main/node/server/main.js

test:
	mocha src/test/node/TestTypes.js \
	      src/test/node/server/data/TestUsers.js

compile:
	pegjs --track-line-and-column src/main/node/rpc/json-rpc.grammar src/main/node/rpc/json-rpc-parser.js

browserify:
	browserify src/main/node/client/main.js -o public/bigcanvas.js

init:
	npm install connect canvas ws cookie-signature ejs path big-integer underscore backbone redis expect.js redis-lock
	npm install -g browserify pegjs mocha yuidocjs

run:
	node src/main/node/server/main.js

test:
	mocha src/test/node/TestTypes.js \
	      src/test/node/server/data/TestUsers.js

doc:
	yuidoc src/main/node/
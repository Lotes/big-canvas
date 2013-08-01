browserify:
	browserify src/main/node/client/main.js -o public/bigcanvas.js

init:
	npm install connect canvas ws cookie-signature ejs path big-integer underscore backbone
    npm install -g browserify
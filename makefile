init-filesystem:
	rm -rf private/tiles
	mkdir private/tiles

build-doc:
	yuidoc src/main/node/

build-style:
	lessc public/bigcanvas.less public/bigcanvas.css
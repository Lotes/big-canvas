# ABOUT

big-canvas is a collaborative drawing tool for the browser. It is a practically infinite drawing surface in all four directions. You draw with a brush, use an eraser, undo an action or redo it.

(The following description explains the idea behind big-canvas. But it is not implemented so far. Please be patient ;D. See the `FEATURES.md` and `TODO.md` for the current progress.)

TODO
* link to forum

## Coordinates

The canvas is accessed via your coordinate on it over the URL, e.g. `http://localhost/#x=-146&y=1059` would be the URL with coordinate (-146, 1059) in the center of your screen. Every user that knows the coordinate to your drawing can change it.

Sooo, how to avoid, that another user can overwrite your work? You can't! But you can generate a random coordinate and keep it as a secret! Coordinates can have up to ~250 digits. It is probabilisticly impossible to guess the region of an other user! But how can you publish your work?

## Publication

big-canvas has two concepts for publication:
* `images` are an anonymization of regions. In the editor mode you can define a region (x, y, width, height) as an image. This will generate an URL like `http://localhost/images/a2dokd9w1` which returns a PNG image of the defined width and height. There are `static` and `live` images. Static ones return the version of the moment of definition. Live images return the current version of the defined region.
* `read-only mode` is like the editor mode but you cannot edit the canvas. The read-only mode is bound to a coordinate. E.g. the URL `http://localhost/readonly/ais8e20pp` is bound to the coordinate (1000, 500) and `http://localhost/readonly/ais8e20pp#x=0&y=100` to (1000,600).

## Layers

big-canvas supports layers. But you cannot add new layers, there is a fixed amount of them (default is 5).

## Comments

You can post comments to any coordinate you want.
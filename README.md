# mediacanvas.js

mediacanvas.js is a lightweight utility that can be used to render multiple types of media to a single `<canvas>` simultaneously. It uses [`window.requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) internally to render frames at your screen's refresh rate, and supports adding/removing/updating items in the rendering queue on the fly&mdash;even while rendering is in progress.

## Installing MediaCanvas
### NPM (recommended)
```
npm install --save mediacanvas
```

Then:

#### ES2015 modules

```javascript
import MediaCanvas from 'mediacanvas';
```

or:

#### UMD

```javascript
const MediaCanvas = require('mediacanvas');
```

### CDN

When using MediaCanvas in this way, a global value `MediaCanvas` is added to the `window` object in your browser. You can avoid name conflicts by instead installing it via your favorite package manager and importing the `MediaCanvas` class into a more limited scope.

*Note: you can also download a copy of this library at the links below if you prefer using a local copy.*

#### Development

https://unpkg.com/mediacanvas/dist/mediacanvas.js

```html
<script src="https://unpkg.com/mediacanvas/dist/mediacanvas.js"></script>
```

or:
#### Production

https://unpkg.com/mediacanvas/dist/mediacanvas.min.js

```html
<script src="https://unpkg.com/mediacanvas/dist/mediacanvas.min.js"></script>
```

*A source map for the production version of MediaCanvas is available [here](https://unpkg.com/mediacanvas/dist/mediacanvas.min.js.map).*

## Using MediaCanvas

### Create an instance

Construct an instance of MediaCanvas by passing it an [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement). MediaCanvas initially gets its dimensions from the `clientWidth` and `clientHeight` of the canvas you pass it, so if your canvas is hidden or otherwise not rendered on the screen you may need to set the dimensions afterward.

```javascript
let mediacanvas = new MediaCanvas(document.getElementsById("my-canvas"));
```


### Add media

Push an object onto the `items` property of your instance of MediaCanvas. `items` is a simple array over which MediaCanvas iterates each time it renders a frame.

```javascript
let mediaItem = {
    src: document.getElementById("my-image"),
    x: 0,
    y: 0,
    width: 640,
    height: 360
}

mediacanvas.items.push(mediaItem);
```

Dimensions are relative to the coordinate plane being used by this instance of MediaCanvas. The original width and height properties can be accessed via the `originalWidth` and `originalHeight` properties, respectively.

Each object in `items` should contain `x`, `y`, `width`, `height`, and `src` properties.

### Start, stop, or request a single frame from the renderer

#### Start rendering

```javascript
mediacanvas.start();
```

#### Stop rendering

```javascript
mediacanvas.stop();
```

#### Render a single frame

```javascript
mediacanvas.requestRender();
```

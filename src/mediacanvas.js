export class MediaCanvas {
  constructor(canvas, width = canvas.clientWidth, height = canvas.clientHeight) {
    this._canvas = canvas;
    this._context = canvas.getContext("2d");
    this._rendering = false;

    this.items = [];
    this._coordinateWidth = width;
    this._coordinateHeight = height;
    this._horizontalScale = 1.0;
    this._verticalScale = 1.0;
    this._width = width;
    this._height = height;
    this._canvas.width = width;
    this._canvas.height = height;

    this._startPromiseResolver = null;
    this._stopPromiseResolver = null;
    this._requestRenderResolver = null;

    this._render = this._render.bind(this);
  }

  _render() {
    if (this._context) {
      this._context.clearRect(0, 0, this._width, this._height);
      for (const item of this.items) {
        this._context.drawImage(item.src, 
          item.x * this._horizontalScale, 
          item.y * this._verticalScale, 
          item.width * this._horizontalScale, 
          item.height * this._verticalScale
        );
      }
    }

    // Schedule another render
    if (this._rendering)
      requestAnimationFrame(this._render);
    else {
      if (typeof this._stopPromiseResolver === "function") {
        this._stopPromiseResolver();
        this._stopPromiseResolver = null;
      }
      if (typeof this._requestRenderResolver === "function") {
        this._requestRenderResolver();
        this._requestRenderResolver = null;
      }
    }

    // Fulfill promise
    if (typeof this._startPromiseResolver === "function") {
      this._startPromiseResolver();
      this._startPromiseResolver = null;
    }
  }

  get rendering() {
    return this._rendering;
  }
  
  get width() {
    return this._width;
  }

  set width(width) {
    this.setDimensions(width, this._height);
  }

  get height() {
    return this._height;
  }

  set height(height) {
    this.setDimensions(this._width, height);
  }

  get originalWidth() {
    return this._coordinateWidth;
  }

  get originalHeight() {
    return this._coordinateHeight;
  }

  setDimensions(width, height) {
    this._width = width;
    this._canvas.width = width;
    this._horizontalScale = width / this._coordinateWidth;

    this._height = height;
    this._canvas.height = height;
    this._verticalScale = height / this._coordinateHeight;

    if (!this._rendering)
      this._render();
  }

  matchClientDimensions() {
    this.setDimensions(this._canvas.clientWidth, this._canvas.clientHeight);
  }

  start() {
    return new Promise((resolve, reject) => {
      if (this._rendering)
        reject(new Error("The renderer is already started."));
      else {
        this._rendering = true;
        this._startPromiseResolver = resolve;
        requestAnimationFrame(this._render);
      }
    });
  }

  stop() {
    return new Promise((resolve, reject) => {
      if (this._rendering) {
        this._stopPromiseResolver = resolve;
        this._rendering = false;
      }
      else
        reject(new Error("The renderer is already stopped."));
    });
  }

  requestRender() {
    return new Promise((resolve, reject) => {
      if (this._rendering)
        reject(new Error("The renderer is already started."));
      else if (this._requestRenderResolver !== null)
        reject(new Error("A render has already been scheduled."));
      else {
        this._requestRenderResolver = resolve;
        requestAnimationFrame(this._render);
      }
    });
  }
}

export default MediaCanvas;

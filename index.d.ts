export as namespace MediaCanvas;

export = MediaCanvas;

interface MediaItem {
  src: CSSImageValue|HTMLImageElement|SVGImageElement|HTMLVideoElement|HTMLCanvasElement|ImageBitmap;
  x: number;
  y: number;
  width: number;
  height: number;
}

declare class MediaCanvas {
  /**
   * Constructs a new instance of MediaCanvas.
   * @param canvas The canvas to use as a rendering target.
   * @param width The width of the coordinate system. If omitted, defaults to the clientWidth of the canvas that was passed.
   * @param height The height of the coordinate system. If omitted, defaults to the clientHeight of the canvas that was passed.
   */
  constructor(canvas: HTMLCanvasElement, width?: number, height?: number);

  /** An array of items that will be rendered on each frame. */
  items: MediaItem[];

  /** True if the instance of MediaCanvas is currently rendering, false if it is not. */
  get rendering(): boolean;

  /** The width at which frames are rendered. */
  width: number;

  /** The height at which frames are rendered. */
  height: number;

  /** The width of the coordinate system used for positioning items. */
  get originalWidth(): number;

  /** The height of the coordinate system used for positioning items. */
  get originalHeight(): number;

  /**
   * Starts rendering.
   * @returns A promise that resolves once rendering has started.
   */
  start(): Promise<void>;

  /**
   * Stops rendering.
   * @returns A promise that resolves once rendering has stopped.
   */
  stop(): Promise<void>;

  /**
   * Sets the dimensions to be used when rendering. This causes the internal <canvas> element to receive new width and height attributes.
   * @param width The width, in pixels.
   * @param height The height, in pixels.
   */
  setDimensions(width: number, height: number): void;

  /**
   * Sets the renderer's dimensions to match the current client dimensions of the internal <canvas> element.
   */
  matchClientDimensions(): void;

  /**
   * Requests that a single frame be rendered.
   * @returns A promise that resolves once the frame has been rendered.
   */
  requestRender(): Promise<void>;
}

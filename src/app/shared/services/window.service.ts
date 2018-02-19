function _window(): object {
  return window;
}

export class WindowService {
  private widthSize = window.innerWidth;

  get nativeWindow(): object {
    return _window();
  }

  get width(): number {
    return this.widthSize;
  }

  set width(num: number) {
    this.widthSize = num;
  }
}
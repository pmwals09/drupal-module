export class HeaderConfig {
  constructor({ route, text, color, nav }) {
    this._route = route;
    this._text = text;
    this._color = color;
    this._nav = nav;
  }

  get route() {
    return this._route;
  }

  set route(newRoute) {
    this._route = newRoute;
  }

  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  get color() {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
  }

  get nav() {
    return this._nav;
  }

  set nav(newNav) {
    this._nav = newNav;
  }
}

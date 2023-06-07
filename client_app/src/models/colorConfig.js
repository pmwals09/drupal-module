export class ColorConfig {
  constructor({
    primary,
    rangeStart,
    rangeEnd,
    text = "#FFFFFF",
    humanReadable,
  }) {
    this._primary = primary;
    this._rangeStart = rangeStart;
    this._rangeEnd = rangeEnd;
    this._text = text;
    this._humanReadable = humanReadable;
  }

  get primary() {
    return this._primary;
  }

  set primary(newPrimary) {
    this._primary = newPrimary;
  }

  get rangeStart() {
    return this._rangeStart;
  }

  set rangeStart(newRangeStart) {
    this._rangeStart = newRangeStart;
  }

  get rangeEnd() {
    return this._rangeEnd;
  }

  set rangeEnd(newRangeEnd) {
    this._rangeEnd = newRangeEnd;
  }

  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  get humanReadable() {
    return this._humanReadable;
  }

  set humanReadable(newHumanReadable) {
    this._humanReadable = newHumanReadable;
  }
}

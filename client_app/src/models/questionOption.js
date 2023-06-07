export class Option {
  constructor({ text, shortText, nextId, letter }) {
    this._text = text;
    this._shortText = shortText;
    this._nextId = nextId;
    this._letter = letter;
  }

  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  get shortText() {
    if (this._shortText) {
      return this._shortText;
    }
    return this._text;
  }

  set shortText(newShortText) {
    this._shortText = newShortText;
  }

  get nextId() {
    return this._nextId;
  }

  set nextId(newNextId) {
    this._nextId = newNextId;
  }

  get letter() {
    return this._letter || null;
  }

  set letter(newLetter) {
    this._letter = newLetter;
  }
}

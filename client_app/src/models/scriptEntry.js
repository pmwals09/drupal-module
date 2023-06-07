export class ScriptEntry {
  constructor({ type, name, content }) {
    this._type = type;
    this._name = name;
    this._content = content;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    this._type = newType;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get content() {
    return this._content;
  }

  set content(newContent) {
    this._content = newContent;
  }

  toPojo() {
    return {
      type: this.type,
      name: this.name,
      content: this.content,
    };
  }
}

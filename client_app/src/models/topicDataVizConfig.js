import { DataVizConfig } from "./dataVizConfig.js";

export class TopicDataVizConfig extends DataVizConfig {
  constructor({ customText, ...rest }) {
    super({ ...rest });
    this._customText = customText;
  }

  get customText() {
    return this._customText;
  }

  set customText(newCustomText) {
    this._customText = newCustomText;
  }
}

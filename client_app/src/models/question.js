import { topicsConfig } from "../screens/Topics/Topics.config.js";

export class Question {
  /**
   * @constructor
   * @param {{}} args - argument object for named arguments
   * @param {string} args.text - the original text of the question, as displayed in chat
   * @param {string} args.shortText - the shortened text of the question, as displayed in dataviz
   * @param {Option[]} args.options - the question's response options
   * @param {string} args.defaultNext - the default next scripted thread to add. If it contains a `/`, then it's a path and represents navigation to another topic
   * @param {string} args.topicId - the topic under which this question falls
   * @param {string} args.questionId - the specific id of this question within its topic
   * @param {bool} args.suppressSubmission - suppress submitting a response to the backend
   * @param {bool} args.suppressResponse - suppress a persona's standard response with %
   * @param {bool} args.shouldAskOptions - include the response options when asking the question
   * @param {DataVizConfig} args.dataViz - the type of chart to use in dataviz to represent responses to this question
   */
  constructor({
    text,
    shortText,
    options,
    persona,
    defaultNext,
    topicId,
    questionId,
    suppressSubmission = false,
    suppressResponse = false,
    shouldAskOptions = true,
    dataViz,
    responseFormatter = null,
  }) {
    this._text = text;
    this._shortText = shortText;
    this._options = options;
    this._persona = persona;
    this._defaultNext = defaultNext;
    this._topicId = topicId;
    this._questionId = questionId;
    this._suppressSubmission = suppressSubmission;
    this._suppressResponse = suppressResponse;
    this._shouldAskOptions = shouldAskOptions;
    this._dataViz = dataViz;
    this._responseFormatter = responseFormatter;
  }

  /**
   * @returns {string} - unique question identifier based on its topic and question ids
   */
  get id() {
    return `${this.topicId}.${this.questionId}`;
  }

  set id(newId) {
    this._id = newId;
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

  get options() {
    return this._options;
  }

  set options(newOptions) {
    this._options = newOptions;
  }

  get persona() {
    return this._persona;
  }

  set persona(newPersona) {
    this._persona = newPersona;
  }

  get defaultNext() {
    return this._defaultNext;
  }

  set defaultNext(newDefaultNext) {
    this._defaultNext = newDefaultNext;
  }

  get dataViz() {
    return this._dataViz;
  }

  set dataViz(newDataViz) {
    this._dataViz = newDataViz;
  }

  get topicId() {
    return this._topicId;
  }

  set topicId(newTopicId) {
    this._topicId = newTopicId;
  }

  get questionId() {
    return this._questionId;
  }

  set questionId(newQuestionId) {
    this._questionId = newQuestionId;
  }

  get suppressSubmission() {
    return this._suppressSubmission;
  }

  set suppressSubmission(newSuppressSubmission) {
    this._suppressSubmission = Boolean(newSuppressSubmission);
  }

  get suppressResponse() {
    return this._suppressResponse;
  }

  set suppressResponse(newSuppressResponse) {
    this._suppressResponse = Boolean(newSuppressResponse);
  }

  get shouldAskOptions() {
    return this._shouldAskOptions;
  }

  set shouldAskOptions(newShouldAskOptions) {
    this._shouldAskOptions = newShouldAskOptions;
  }

  get responseFormatter() {
    return this._responseFormatter;
  }

  set responseFormatter(newResponseFormatter) {
    this._responseFormatter = newResponseFormatter;
  }

  get topic() {
    return topicsConfig.find((ea) => ea.key === this.topicId);
  }

  // NOTE: Ideally the validator would exist here with the rest of the question,
  // but right now the script is self-referential and would require a greater
  // effort to refactor than we have time (as of 2/27). Saving for later
  validator(text) {
    const defaultRes = [false, this.defaultNext];
    const textOptionIdx = this.fastOptions
      .split(" ")
      .findIndex((ea) => ea === text.toUpperCase());
    if (textOptionIdx > 0) {
      const { nextId } = this.options[textOptionIdx];
      return [true, nextId || this.defaultNext];
    }
    return defaultRes;
  }

  /*
   * Determine the fast option string based on the number of valid responses to this question
   * @returns {{letter: string, text: string}[]} - the space-separated fast-option string
   */
  get fastOptions() {
    if (!this.options?.length) {
      return [];
    }
    if (Array.isArray(this.options)) {
      const fastResponses = [];
      for (let i = 0; i < this.options.length; i += 1) {
        fastResponses.push({
          letter:
            this.options[i].letter ||
            String.fromCharCode(i + "A".charCodeAt(0)),
          text: this.options[i].text,
        });
      }
      return fastResponses;
    }
    return [];
  }
}

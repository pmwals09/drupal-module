import { produce } from "immer";
import { Persona } from "./persona.js";

export class Chat {
  constructor({
    rawContent,
    sender,
    type,
    validator = null,
    reactContent = null,
    id = null,
    suppressResponse = false,
    suppressSubmission = false,
  }) {
    this._rawContent = rawContent;
    this._sender = sender;
    this._type = type;
    this._validator = validator;
    this._reactContent = reactContent;
    this._id = id;
    this._suppressResponse = suppressResponse;
    this._suppressSubmission = suppressSubmission;
  }

  static maxDuration = 3000;

  get rawContent() {
    return this._rawContent;
  }

  set rawContent(newContent) {
    this._rawContent = newContent;
  }

  get sender() {
    return this._sender;
  }

  set sender(newSender) {
    this._sender = newSender;
  }

  get type() {
    return this._type;
  }

  set type(newType) {
    this._type = newType;
  }

  get validator() {
    return this._validator;
  }

  set validator(newValidator) {
    this._validator = newValidator;
  }

  get reactContent() {
    return this._reactContent;
  }

  set reactContent(newContent) {
    this._reactContent = newContent;
  }

  get id() {
    return this._id;
  }

  set id(newId) {
    this._id = newId;
  }

  get suppressResponse() {
    return this._suppressResponse;
  }

  set suppressResponse(newSuppressResponse) {
    this._suppressResponse = newSuppressResponse;
  }

  get suppressSubmission() {
    return this._suppressSubmission;
  }

  set suppressSubmission(newSuppressSubmission) {
    this._suppressSubmission = newSuppressSubmission;
  }

  static fromScript({
    name,
    rawContent,
    type,
    validator,
    id,
    isKiosk = false,
    suppressResponse = false,
    suppressSubmission = false,
  }) {
    let content = rawContent;
    if (isKiosk && type === "question") {
      content = produce(content, (draft) => {
        draft.push({
          tag: "p",
          attributes: {
            className: "visually-hidden",
          },
          children: `On the key pad, use the left and right arrow keys at the top to ${
            validator()[1].includes("/")
              ? 'choose "yes" or "no."'
              : "move through the letters."
          } Use the round key in the center top to select.`,
        });
      });
    }
    const reactContent = content.map(function mapChildren(contentItem) {
      const T = contentItem.tag;
      if (typeof contentItem.children === "string") {
        return (
          // eslint-disable-next-line react/jsx-filename-extension
          <T
            // eslint-disable-next-line react/jsx-props-no-spreading, react/jsx-filename-extension
            {...contentItem.attributes}
            key={JSON.stringify(contentItem.children)}
          >
            {contentItem.children}
          </T>
        );
      }
      if (
        Array.isArray(contentItem.children) &&
        contentItem.children.length > 0
      ) {
        return (
          // eslint-disable-next-line react/jsx-filename-extension
          <T
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...contentItem.attributes}
            key={`${JSON.stringify(contentItem.attributes)}-${
              contentItem.children.length
            }`}
          >
            {contentItem.children.map(mapChildren)}
          </T>
        );
      }

      return (
        <T
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...contentItem.attributes}
          key={JSON.stringify(contentItem.attributes)}
          onLoad={(e) =>
            e.target.dispatchEvent(
              new CustomEvent("image-loaded", { bubbles: true })
            )
          }
        />
      );
    });
    return new Chat({
      rawContent: content,
      reactContent,
      sender: new Persona({ name }),
      type,
      validator,
      id,
      suppressResponse,
      suppressSubmission,
    });
  }

  duration(perCharTime = 100) {
    return Math.min(
      Chat.maxDuration,
      this.rawContent.reduce((total, item) => {
        switch (item.tag) {
          case "p":
            return total + item.children.length * perCharTime;
          case "img":
            return total + 2000;
          default:
            return total + 1000;
        }
      }, 0)
    );
  }

  toString() {
    return JSON.stringify({
      content: this.rawContent,
      sender: this.sender,
      type: this.type,
      validator: this.validator,
      id: this.id,
    });
  }

  announce(announcerFn) {
    let textToAdd = "";
    if (this.validator && typeof this.validator()[1] === "string") {
      textToAdd = "This chat topic is done, but you can join a new topic. ";
    }
    textToAdd += this.rawContent
      .map((item) => {
        switch (item.tag) {
          case "p":
            return mapTtsAbbreviations(item.children);
          case "img":
            return mapTtsAbbreviations(item.attributes.alt);
          case "ol":
            return item.children
              .map(
                (liItem, i) =>
                  `${String.fromCharCode(
                    i + "A".charCodeAt(0)
                  )}. ${mapTtsAbbreviations(liItem.children)}.`
              )
              .join(" ");
          default:
            return "";
        }
      })
      .join(" ");

    if (this.id === "last") {
      textToAdd +=
        " This chat is done. To pick another topic, press the left arrow key and then the center key to select.";
    }

    textToAdd = `${this.sender.name}. ${textToAdd}`;

    announcerFn({ message: textToAdd });
  }
}

const abbrevMap = {
  ppl: "people",
  "...": "dot dot dot",
  "24-7,": "twenty-four seven",
  "1-5": "one to five",
  co2: "C O 2",
  lbs: "pounds",
  noooo: "no",
  hehehe: "heh heh heh",
  fomo: "foe moe",
  omg: "O.M.G.",
  tbh: "to be honest",
  "w/o": "without",
  $$: "money",
  "$$,": "money,",
  lol: "L.O.L.",
  "😍😍": "Heart eyes emojis.",
  "👕": "t-shirt emoji",
  "👔": "necktie emoji",
  "🤷": "person shrugging emoji",

  "😰": "anxious face with sweat emoji.",
  "😻": "smiling cat face with heart-shaped eyes emoji",
  "🤑": "money-mouth face emoji",
  "🙄": "rolling eyes emoji",
  "😳": "flushed face emoji.",
  "🧕": "girl with purple headscarf emoji.",
  "😆": "grinning squinting face emoji",
  "❤️": "heart emoji.",
  "🤯": "shocked face with exploding head emoji",
  "😤": "steam from nose emoji.",
  "🍕": "slice of pizza emoji",
  "😂🤣": "laughing emojis.",
  "🤨": "raised eyebrow emoji.",
  "😱😱😱": 'three "the scream" emojis.',
  "😏": "smirking emoji.",
  "😅": "grinning face with sweat emoji.",
  "🌮": "taco emoji",
  "🤔": "thinking face emoji",
  "😫": "tired face emoji",
  w: "with",
  "w/": "with",
  gifs: "jifs",
  gif: "jif",
  $50: "fifty dollars",
  $100: "one hundred dollars",
  miiiiles: "miles",
};

export function mapTtsAbbreviations(string) {
  let words = string
    .split(/\s/i)
    .map((word) => (word.includes("...") ? word.split("...") : word));
  words.forEach((word) =>
    Array.isArray(word) ? word.splice(1, 0, "...") : null
  );
  words = words.flat();
  let sentence = words
    .map((word) => word.toLowerCase())
    .map((word) => (word in abbrevMap ? abbrevMap[word] : word))
    .join(" ")
    .trim();

  if (![".", "?", "!"].includes(sentence[sentence.length - 1])) {
    sentence += ".";
  }

  return sentence;
}

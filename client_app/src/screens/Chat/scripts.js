/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line import/extensions
import { images } from "../../assets/images";
import questions from "./questions.js";
import resourcesIcon from "../../assets/svg/resources.svg";
import infrastructureIcon from "../../assets/svg/infrastructure.svg";
import cultureIcon from "../../assets/svg/culture.svg";
import circularEconomyIcon from "../../assets/svg/circular-economy.svg";
import influenceIcon from "../../assets/svg/influence.svg";
import * as emoji from "../../assets/images/emoji/index.js";

const {
  dataVizPlaceholder,
  wavyCat,
  zombieBaby,
  newPhone,
  noSignal,
  speedyCat,
  moreSpectrum,
  flyingCat,
  tooManyCalls,
  accessories,
  landlineFear,
  couchWarmer,
  scaredCat,
} = images.script;

const TEXT = "text";
const Q = "question";
const TONI = "Toni";
const MATEO = "Mateo";
const NADIA = "Nadia";
const BUTTERBEAN = "Butterbean";

// NOTE: Ideally the validator would exist here with the rest of the question,
// but right now the script is self-referential and would require a greater
// effort to refactor than we have time (as of 2/27). Saving for later

const emojiMap = {
  FrowningSadFace: {
    src: emoji.FrowningSadFace,
    alt: "frowning sad face emoji",
  },

  AnxiousSweatFace: {
    src: emoji.AnxiousSweatFace,
    alt: "anxious face with sweat emoji.",
  },
  CatHeartEyes: {
    src: emoji.CatHeartEyes,
    alt: "smiling cat face with heart-shaped eyes emoji",
  },
  DollarMoneyFace: {
    src: emoji.DollarMoneyFace,
    alt: "money-mouth face emoji",
  },
  EyerollFace: { src: emoji.EyerollFace, alt: "rolling eyes emoji" },
  FlushedFace: { src: emoji.FlushedFace, alt: "flushed face emoji." },
  GirlHeadscarf: {
    src: emoji.GirlHeadscarf,
    alt: "girl with purple headscarf emoji.",
  },
  GrinningSquintFace: {
    src: emoji.GrinningSquintFace,
    alt: "grinning squinting face emoji",
  },
  Heart: { src: emoji.Heart, alt: "heart emoji" },
  LaughingTearsOfJoyFace: {
    src: emoji.LaughingTearsOfJoyFace,
    alt: "laughing tears of joy emoji.",
  },
  MindBlownFace: {
    src: emoji.MindBlownFace,
    alt: "shocked face with exploding head emoji",
  },
  NoseBlowingSteamFace: {
    src: emoji.NoseBlowingSteamFace,
    alt: "steam from nose emoji.",
  },
  Pizza: { src: emoji.Pizza, alt: "slice of pizza emoji" },
  RoflTilted: { src: emoji.RoflTilted, alt: "tilted laughing emoji" },
  RaisedEyebrowFace: {
    src: emoji.RaisedEyebrowFace,
    alt: "raised eyebrow emoji.",
  },
  ScreamingInFearFace: {
    src: emoji.ScreamingInFearFace,
    alt: "the scream emoji",
  },
  SmirkingFace: { src: emoji.SmirkingFace, alt: "smirking emoji." },
  SweatyGrinFace: {
    src: emoji.SweatyGrinFace,
    alt: "grinning face with sweat emoji.",
  },
  Taco: { src: emoji.Taco, alt: "taco emoji" },
  ThinkingFace: { src: emoji.ThinkingFace, alt: "thinking face emoji" },
  TiredFace: { src: emoji.TiredFace, alt: "tired face emoji" },
  HeartEyesFace: { src: emoji.HeartEyesFace, alt: "heart eyes emoji." },
  BrokenPhone: { src: emoji.BrokenPhone, alt: "broken phone emoji." },
};

function onboarding({ isKiosk, target, completeCb }) {
  return {
    seed() {
      const kickoff = [
        {
          type: TEXT,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Hey, I'm Toni. Welcome to our group chat!",
            },
          ],
        },
      ];

      if (isKiosk) {
        completeCb();
        return [
          ...kickoff,
          {
            id: "onboarding.firstTime",
            type: Q,
            name: "Toni",
            timing: 0,
            rawContent: [
              {
                tag: "p",
                attributes: {},
                children: "Are you joining for the first time?",
              },
            ],
            validator: (text) => {
              if (text && text.match(/^yes$/i)) {
                return [true, this.shouldContinue()];
              }
              if (text && text.match(/^no$/i)) {
                return [true, this.couldSkip({ target, cb: completeCb })];
              }
              return [false, this.shouldContinue()];
            },
            suppressSubmission: true,
            suppressResponse: true,
          },
        ];
      }
      completeCb();
      return [...kickoff, ...this.postSeed()];
    },
    couldSkip() {
      return [
        {
          id: "onboarding.couldSkip",
          type: Q,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Cool. Would you like to skip this and jump right in?",
            },
          ],
          validator: (text) => {
            if (text && text.match(/^yes$/i)) {
              // set hasGoneThroughOnboarding to true
              completeCb();
              return [true, target || "/chatbot/chat"];
            }
            if (text && text.match(/^no$/i)) {
              return [true, "/chatbot/chat"];
            }
            return [false, this.shouldContinue()];
          },
          suppressSubmission: true,
          suppressResponse: true,
        },
      ];
    },
    shouldContinue() {
      return [
        {
          type: TEXT,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Cool. Meet the rest of my friends.",
            },
          ],
        },
        ...this.postSeed(),
      ];
    },
    postSeed() {
      return [
        {
          type: TEXT,
          name: MATEO,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Hi, I'm Mateo.",
            },
          ],
        },
        {
          type: TEXT,
          name: NADIA,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "I'm Nadia, and we've got questions about you and your cellphone.",
            },
          ],
        },
        {
          type: TEXT,
          name: NADIA,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "BTW, your answers are private! We’re not saving your data.",
            },
          ],
        },
        {
          ...questionToScript(
            questions.find((q) => q.id === "onboarding.time")
          ),
          validator: (text) => {
            if (text && text.match(/^[a-d]$/i)) {
              return [true, this.memes()];
            }
            return [false, this.memes()];
          },
        },
      ];
    },
    memes() {
      return [
        {
          type: TEXT,
          name: MATEO,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "Interesting, right? The average for ppl in the U.S. is 3 hours and 15 minutes a day.",
            },
          ],
        },
        {
          type: TEXT,
          name: NADIA,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                'If you wanna know for sure, check under your phone\'s "Settings" menu.',
            },
          ],
        },
        {
          type: TEXT,
          name: MATEO,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "Your answers - and everyone's - feed into this data viz screen. Anonymously of course! And only here at the museum (not online).",
            },
            {
              tag: "img",
              attributes: {
                src: dataVizPlaceholder,
                alt: "Image of the exhibit hall showing comic panels on the wall. On an adjacent wall, is a large monitor with a colorful bar graph.",
              },
              children: [],
            },
          ],
        },
        {
          type: TEXT,
          name: NADIA,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "You'll find it across from the Studio and near a huge awesome comic...starring me!",
            },
          ],
        },
        {
          type: TEXT,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Um. Mateo and I are in the comic too",
            },
          ],
        },
        {
          type: TEXT,
          name: BUTTERBEAN,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "As am I: Captain Butterbean.",
            },
            {
              tag: "img",
              attributes: {
                src: wavyCat,
                alt: "Butterbean posts a video meme showing a cat on its back looking up at us as it waves its front paws.",
              },
              children: [],
            },
          ],
        },
        {
          type: TEXT,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {
                className: "text__emoji-text",
              },
              children: "Yeah that's Mateo's cat who loves to send memes",
            },
            {
              tag: "img",
              attributes: {
                ...emojiMap.EyerollFace,
                className: "text__emoji",
              },
              children: [],
            },
          ],
        },
        {
          ...questionToScript(
            questions.find((q) => q.id === "onboarding.memes")
          ),
          validator: (text) => {
            if (text && text.match(/^[a-d]$/i)) {
              return [true, this.howOld()];
            }
            return [false, this.howOld()];
          },
        },
      ];
    },
    howOld() {
      return [
        {
          type: TEXT,
          name: BUTTERBEAN,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children:
                "I know a meme when I see one. But to use 'em here, we have to tell you that memes are photos or gif references to popular culture that help communicate an idea. Their meanings shift as they get tweaked and passed around on our phones. The point of a meme is to share cultural understanding, start a conversation, or make us laugh...or cringe.",
            },
          ],
        },
        {
          type: TEXT,
          name: BUTTERBEAN,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Like this one. Makes me laugh!",
            },
            {
              tag: "img",
              attributes: {
                src: zombieBaby,
                alt: 'The meme shows a baby on top of a red tabby cat, putting his mouth on the cat\'s head. The text bubble from the baby reads, "Bwainz!!!". The text bubble from the cat reads, "You let him watch another zombie movie, didn\'t you?"',
              },
              children: [],
            },
          ],
        },
        {
          type: TEXT,
          name: MATEO,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "Makes ME cringe. So 2010, Butterbean.",
            },
          ],
        },
        {
          ...questionToScript(
            questions.find((q) => q.id === "onboarding.howOld")
          ),
          validator: (text) => {
            if (text && text.match(/^[a-g]$/i)) {
              return [true, this.end()];
            }
            return [false, this.end()];
          },
        },
      ];
    },
    end() {
      return [
        {
          id: "onboarding.end",
          type: Q,
          name: TONI,
          timing: 0,
          rawContent: [
            {
              tag: "p",
              attributes: {},
              children: "You with me? Let's keep going.",
            },
            {
              tag: "p",
              attributes: {},
              children: 'Select "yes" to keep chatting.',
            },
          ],
          validator: (text) => {
            completeCb();
            if (text && text.match(/^yes$/i)) {
              return [true, target || "/chatbot/chat/resources"];
            }
            if (text && text.match(/^no$/i)) {
              return [true, "/chatbot/chat"];
            }
            return [false, "/chatbot/chat/resources"];
          },
        },
      ];
    },
  };
}

const resources = {
  seed() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Let's chat about what goes into our cellphones.",
          },
          {
            tag: "img",
            attributes: {
              src: resourcesIcon,
              alt: "",
              className: "text__icon-phone",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Nadia, you use your phone like 24-7, right?",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.FlushedFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Do ya know how much of your phone's carbon footprint comes from its production?",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [{ tag: "p", attributes: {}, children: "Um, 10 percent?" }],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [{ tag: "p", attributes: {}, children: "50 percent?" }],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "resources.poundsCo2")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-d]$/i)) {
            return [true, this.fairTrade()];
          }
          return [false, this.fairTrade()];
        },
      },
    ];
  },
  fairTrade() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "At least 80 percent of your phone's carbon footprint comes from manufacturing. Not from daily use!",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.FlushedFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.FlushedFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "My little cellphone???? Noooo way",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Well they’re complicated to make.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "They involve people and labor all over the world. And they use rare minerals.",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "And like everyone on Earth has one...add it up",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.ThinkingFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "resources.fairTrade")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-d]$/i)) {
            return [true, this.howOftenNew()];
          }
          return [false, this.howOftenNew()];
        },
      },
    ];
  },
  howOftenNew() {
    return [
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I want to but can’t afford it. Phones are expensive",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.DollarMoneyFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "That’s cuz you buy a new one once a month!",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              src: newPhone,
              alt: 'Toni posts a video meme showing a little girl bubbling with excitement and adds a caption that says "Nadia: when a new phone comes out."',
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "I don’t!! Maybe...every 18 months?",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.SweatyGrinFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Ok I have to! I'm an influencer!!!!!",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Yeah but like 80% of your phone’s carbon emissions happen when it’s built. Before you even use it!!",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.MindBlownFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "What do I do??",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "You could buy a refurbished phone. Or get your old one fixed!",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "You don't have to live with a busted screen or camera.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "For real, you know I couldn’t!",
          },
          {
            tag: "p",
            attributes: {},
            children: "But ok. I can get onboard w a new-to-me phone.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "resources.howOftenNew")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-e]$/i)) {
            return [true, this.whatMakesGetNew()];
          }
          return [false, this.whatMakesGetNew()];
        },
      },
    ];
  },
  whatMakesGetNew() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "resources.whatMakesGetNew")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-f]$/i)) {
            return [true, this.end()];
          }
          return [false, this.end()];
        },
      },
    ];
  },
  end() {
    return [
      {
        type: Q,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "So what does it take to make your cellphone work? Select 'yes' to keep chatting.",
          },
        ],
        validator: (text) => {
          if (text && text.match(/^yes$/i)) {
            return [true, "/chatbot/chat/infrastructure"];
          }
          if (text && text.match(/^no$/i)) {
            return [true, "/chatbot/chat"];
          }
          return [false, "/chatbot/chat/infrastructure"];
        },
      },
    ];
  },
};

const infrastructure = {
  seed() {
    return [
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Let's chat about what makes our cellphones work.",
          },
          {
            tag: "img",
            attributes: {
              src: infrastructureIcon,
              alt: "",
              className: "text__icon-phone",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Aaaaaaah! I can't get a signal!!",
          },
          {
            tag: "img",
            attributes: {
              src: noSignal,
              alt: "Meme of Freddy Mercury right arm raised high over his head. Caption reads: Trying to get phone signal. Does this motion equal success.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Hehehe. FOMO kicking in?",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.EyerollFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I hate feeling disconnected!",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "I'm having trouble too. I wonder what's going on. Satellites down or something?",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Satellites aren't used except in emergency SOS situations...at least for now. There are just towers.",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "WHAT? I always just assumed it was magic",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.GrinningSquintFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.EyerollFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Typical...",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "For real, internet data and phone calls all travel thru fiber optic cables. Mind-blowing how fast data goes on those tiny threads...7 (!!) times around the world every second!",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "infrastructure.infraFacts")
        ),
        validator: (text) => {
          if (text && text.match(/^[ab]$/i)) {
            return [true, this.infraSatellites()];
          }
          if (text && text.match(/^[cd]$/i)) {
            return [true, this.infraRadio()];
          }
          return [false, this.infraRadio()];
        },
      },
    ];
  },
  infraSatellites() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "No satellites yet. Just many towers, receivers and miiiiles of fiber optic cables.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "Wild, right? We say wireless, but wires everywhere. Even UNDER the ocean!",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.MindBlownFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "All those calls and data fly around as light pulses. Like...what?!",
          },
          {
            tag: "img",
            attributes: {
              src: speedyCat,
              alt: "Meme of cat flying with speed streaks behind.",
            },
            children: [],
          },
        ],
      },
      ...this.infraFinish(),
    ];
  },
  infraRadio() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "So this thing is actually just an expensive radio?  I’ll make sure my mom knows. She can tune it to NPR.",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.EyerollFace,
              className: "text__emoji",
            },
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Kinda makes sense, tho. You drive into a tunnel and the radio goes to static.",
          },
          {
            tag: "p",
            attributes: {},
            children:
              "Or when you’re looking for Butterbean hiding in the basement, your phone signal gets weak.",
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: 'I need my "me" time.',
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "About the limited frequencies...if we can send tourists to space, can’t we find a way to use more of the spectrum??",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              src: moreSpectrum,
              alt: "Meme of cartoon scientist, Professor Farnsworth from Futurama, in lab coat wearing goggles. Caption reads, Good news, everyone. I'm sciencing as fast as I can.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "But for real, engineers are working on it!",
          },
        ],
      },
      ...this.infraFinish(),
    ];
  },
  infraFinish() {
    return [
      {
        type: Q,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Next up: How do people use their cellphones?",
          },
          {
            tag: "p",
            attributes: {},
            children: 'Select "yes" to learn more and keep chatting.',
          },
        ],
        validator: (text) => {
          if (text && text.match(/^yes$/i)) {
            return [true, "/chatbot/chat/culture"];
          }
          if (text && text.match(/^no$/i)) {
            return [true, "/chatbot/chat"];
          }
          return [false, "/chatbot/chat/culture"];
        },
      },
    ];
  },
};

const culture = {
  seed() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Get ready to talk about how people use their cellphones.",
          },
          {
            tag: "img",
            attributes: {
              src: cultureIcon,
              alt: "",
              className: "text__icon-phone",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "I read this article saying that cellphones are destroying culture. But my phone makes connecting to my culture way easier.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "What culture? Sneakerheads? Dudes who text cat gifs?",
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Actually, I find cat gifs rather delightful...",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.CatHeartEyes,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              src: flyingCat,
              alt: "Video meme of red tabby kitten flying through air legs outstretched.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "HAH. Actually, I've been learning Abuela's language on a language app. I want to surprise her by knowing some Mixtec.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "For real? Teach me something!",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: 'OK, "A yee va\'a menu?" means "How are you?"',
          },
          {
            tag: "p",
            attributes: {},
            children: "On the app I can hear how it sounds.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.HeartEyesFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.HeartEyesFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I want that app!",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "My friend videochats with her auntie every Thursday. She’s learning to cook some Pakistani family recipes. But she dropped her phone in the dal",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.LaughingTearsOfJoyFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.RoflTilted,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "culture.connectCulture")
        ),
        validator: (text) => {
          if (text && text.match(/^[abc]$/i)) {
            return [true, this.hasCulture()];
          }
          if (text && text.match(/^[d]$/i)) {
            return [true, this.hasNoCulture()];
          }
          return [false, this.hasCulture()];
        },
      },
    ];
  },
  hasCulture() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "And all because of our phones!",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "You know there was no emoji of a girl in a headscarf until 2017!",
          },
          {
            tag: "p",
            attributes: {},
            children: "A teenager proposed it. Now it’s a thing!",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.GirlHeadscarf,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I feel so seen.",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.Heart,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      ...this.texting(),
    ];
  },
  hasNoCulture() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "We all have culture! From family traditions to what you wear and eat and the languages we speak.",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.Pizza,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.Taco,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Ever been to a 4th of July parade? Bar mitzvah? Quinceñera? It’s all part of culture.",
          },
        ],
      },
      ...this.texting(),
    ];
  },
  texting() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "OMG today at home I heard this weird sound. It was my parents' old landline phone! Captain Butterbean lost it",
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              src: landlineFear,
              alt: "Video meme of a scared black cat, front paws wrapped around person’s arm, yellow eyes open wide, and mouth open. Caption reads: When I hear a landline.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "I don't even make calls on my phone. No one does. It's like rude to make a call now",
          },
          {
            tag: "img",
            attributes: {
              src: tooManyCalls,
              alt: "Meme of Spiderman lying in hospital bed. Caption reads: too many phone calls.",
            },
            children: [],
          },
        ],
      },
      {
        ...questionToScript(questions.find((q) => q.id === "culture.texting")),
        validator: (text) => {
          if (text && text.match(/^[a-e]$/i)) {
            return [true, this.customization()];
          }
          return [false, this.customization()];
        },
      },
    ];
  },
  customization() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "Smartphones also changed how we express ourselves. tbh I find it hard to talk w/o emojis.",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.FlushedFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "It's all about accessorizing",
          },
          {
            tag: "img",
            attributes: {
              src: accessories,
              alt: "Meme showing hand holding phone showing back cover with rear end of cat, tail held high.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "OMG you guys know I'm intense about my notification sounds, right?",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Like all the specific ones I have for different stuff.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "culture.customization")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-e]$/i)) {
            return [true, this.end()];
          }
          return [false, this.end()];
        },
      },
    ];
  },
  end() {
    return [
      {
        type: Q,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Next up: what happens to our old cell phones when we're done with them? It's pretty surprising!",
          },
          {
            tag: "p",
            attributes: {},
            children: 'Select "yes" to keep chatting.',
          },
        ],
        validator: (text) => {
          if (text && text.match(/^yes$/i)) {
            return [true, "/chatbot/chat/circularEconomy"];
          }
          if (text && text.match(/^no$/i)) {
            return [true, "/chatbot/chat"];
          }
          return [false, "/chatbot/chat/circularEconomy"];
        },
      },
    ];
  },
};

const circularEconomy = {
  seed() {
    return [
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Let's talk about what happens to our old cellphones.",
          },
          {
            tag: "img",
            attributes: {
              src: circularEconomyIcon,
              className: "text__icon-phone",
              alt: "",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "New phone, who dis?",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Oh that's dope! Nice. What happened to the old one?",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Do not tell me you just threw it out, chica.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I think Mateo would be really mad if I did...",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.NoseBlowingSteamFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Hey yeah...really bad. E-waste. Hazardous stuff in landfills or burned into the air.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "That phone is still working, right? My friend traded hers in for a discount on a new one",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.FlushedFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Really??? Wish I knew...too late now",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.GirlHeadscarf,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I just kept mine to start a collection",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.SweatyGrinFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "That's not great either. Phones have rare metals that should be reused in new phones. Or recycled.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "OMG what do I do???",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.TiredFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "If it's too late to trade it in for $$, make sure you recycle it with a legit e-waste handler.",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "My mom took hers to a county collection site.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "circularEconomy.oldPhone")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-f]$/i)) {
            return [true, this.repair()];
          }
          return [false, this.repair()];
        },
      },
    ];
  },
  repair() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "If it still works, it's best to donate or give it to someone who can use it",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Yeah, but the screen is pretty messed up ",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.BrokenPhone,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Why not repair?",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Screens are an easy fix at a lot of repair shops, and there's tons of info online if you want to try it yourself.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "circularEconomy.repair")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-f]$/i)) {
            return [true, this.end()];
          }
          return [false, this.end()];
        },
      },
    ];
  },
  end() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children:
              "Bottom line. You should use your phone as long as possible.",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.RaisedEyebrowFace,
              className: "text__emoji",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I know I know",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.AnxiousSweatFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "I'm gonna go donate it.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Overall idea is to keep phones or their parts in use. Repair or recycle. Or use them in other ways. I heard of ppl using them as a music player or as a baby monitor.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Oh!! I know someone who already uses it another way - couch warmer",
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Guilty...",
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.SmirkingFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              src: couchWarmer,
              alt: "Meme showing black and white cat lying down with head on phone using it as a pillow",
            },
            children: [],
          },
        ],
      },
      {
        type: Q,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "We've got more, if you're up for it.",
          },
          {
            tag: "p",
            attributes: {},
            children: 'Select "yes" to keep chatting.',
          },
        ],
        validator: (text) => {
          if (text && text.match(/^yes$/i)) {
            return [true, "/chatbot/chat/influence"];
          }
          if (text && text.match(/^no$/i)) {
            return [true, "/chatbot/chat"];
          }
          return [false, "/chatbot/chat/influence"];
        },
      },
    ];
  },
};

const influence = {
  seed() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Ever think about how cellphones shape our lives? Let's chat about it.",
          },
          {
            tag: "img",
            attributes: {
              src: influenceIcon,
              className: "text__icon-phone",
              alt: "",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "OMG guys...I just found my phone after it was lost all morning",
          },
        ],
      },
      {
        type: TEXT,
        name: BUTTERBEAN,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              src: scaredCat,
              alt: "Meme of scared cat, eyes wide and staring, mouth slightly open.",
            },
            children: [],
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "img",
            attributes: {
              ...emojiMap.ScreamingInFearFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.ScreamingInFearFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "img",
            attributes: {
              ...emojiMap.ScreamingInFearFace,
              className: "text__emoji",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {
              className: "text__emoji-text",
            },
            children: "Worst. Feeling. In. The. World.",
          },
        ],
      },
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Hahaha no wonder you've been so quiet today LOL.",
          },
          {
            tag: "p",
            attributes: {},
            children: "but it's good to see what life is like w/o",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.noPhoneFeeling")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-e]$/i)) {
            return [true, this.authentic()];
          }
          return [false, this.authentic()];
        },
      },
    ];
  },
  authentic() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Weird that a little gadget has so much influence",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Sometimes I think it creates this fake life and my real life only happens when I put it down",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Not me. My phone lets me be more myself.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.authentic")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-e]$/i)) {
            return [true, this.disconnect()];
          }
          return [false, this.disconnect()];
        },
      },
    ];
  },
  disconnect() {
    return [
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "Huh. I'm wondering if you're unusual or if I am, Nadia!",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.disconnect")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-d]$/i)) {
            return [true, this.connected()];
          }
          return [false, this.connected()];
        },
      },
    ];
  },
  connected() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.connected")
        ),
        validator: (text) => {
          if (text && text.match(/^[1-5]$/i)) {
            return [true, this.futureAnxious()];
          }
          return [false, this.futureAnxious()];
        },
      },
    ];
  },
  futureAnxious() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.futureAnxious")
        ),
        validator: (text) => {
          if (text && text.match(/^[1-5]$/i)) {
            return [true, this.inControl()];
          }
          return [false, this.inControl()];
        },
      },
    ];
  },
  inControl() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.inControl")
        ),
        validator: (text) => {
          if (text && text.match(/^[1-5]$/i)) {
            return [true, this.liveConcertVideo()];
          }
          return [false, this.liveConcertVideo()];
        },
      },
    ];
  },
  liveConcertVideo() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.liveConcertVideo")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-c]$/i)) {
            return [true, this.metroFightVideo()];
          }
          return [false, this.metroFightVideo()];
        },
      },
    ];
  },
  metroFightVideo() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.metroFightVideo")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-c]$/i)) {
            return [true, this.policeArrestVideo()];
          }
          return [false, this.policeArrestVideo()];
        },
      },
    ];
  },
  policeArrestVideo() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.policeArrestVideo")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-c]$/i)) {
            return [true, this.teacherAbuseVideo()];
          }
          return [false, this.teacherAbuseVideo()];
        },
      },
    ];
  },
  teacherAbuseVideo() {
    return [
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.teacherAbuseVideo")
        ),
        validator: (text) => {
          if (text && text.match(/^[a-c]$/i)) {
            return [true, this.privacy()];
          }
          return [false, this.privacy()];
        },
      },
    ];
  },
  privacy() {
    return [
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "These were kinda deep, Mateo. I feel like always having a phone in my pocket raises a lot of questions. And the answers aren't black and white.",
          },
        ],
      },
      {
        ...questionToScript(
          questions.find((q) => q.id === "influence.privacy")
        ),
        validator: (text) => {
          if (text && text.match(/^[1-5]$/i)) {
            return [true, this.end()];
          }
          return [false, this.end()];
        },
      },
    ];
  },
  end() {
    return [
      {
        type: TEXT,
        name: MATEO,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "I'm all about privacy. I don't let anyone tag me and I don't let my apps show me ads based on my browsing.",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children: "I'm ok with ppl tagging me. It helps me gain followers!",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "That was A LOT of questions. But they got you thinking, right? And they'll make a sweet data viz.",
          },
          {
            tag: "img",
            attributes: {
              src: dataVizPlaceholder,
              alt: "Image of the exhibit hall showing comic panels on the wall. On an adjacent wall, is a large monitor with a colorful bar graph.",
            },
            children: [],
          },
          {
            tag: "p",
            attributes: {},
            children:
              "Check it out across from the Studio, near the comic. Your input from our chat will be mixed with input from other visitors, and displayed anonymously.",
          },
          {
            tag: "p",
            attributes: {},
            children: "(Only here at the museum, not online).",
          },
        ],
      },
      {
        type: TEXT,
        name: NADIA,
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "Thanks for joining our group chat. But don’t stop talking now! Cellphones and their roles in our lives will continue to raise provocative questions.",
          },
        ],
      },
      {
        type: TEXT,
        name: TONI,
        // TODO: Should I dynamically add this ID to avoid issues in the future
        // of forgetting to move this if the script changes?
        id: "last",
        timing: 0,
        rawContent: [
          {
            tag: "p",
            attributes: {},
            children:
              "So keep the dialogue going when you leave. Select Topics to join other chats.",
          },
        ],
      },
    ];
  },
};

export default {
  onboarding: ({ isKiosk, target, completeCb }) =>
    onboarding({ isKiosk, target, completeCb }).seed(),
  resources: () => resources.seed(),
  infrastructure: () => infrastructure.seed(),
  culture: () => culture.seed(),
  circularEconomy: () => circularEconomy.seed(),
  influence: () => influence.seed(),
};

function questionToScript(q) {
  const qObj = {
    id: q.id,
    type: Q,
    name: q.persona.name,
    timing: q.timing,
    rawContent: [
      {
        tag: "p",
        attributes: {},
        children: q.text,
      },
    ],
  };

  if (q.options && q.shouldAskOptions) {
    let olClassName = "question-options";
    if (q.options.some((option) => option.letter?.match(/\d/))) {
      olClassName += " question-options__numerical";
    }
    qObj.rawContent.push({
      tag: "ol",
      attributes: {
        className: olClassName,
      },
      children: q.options.map((option) => ({
        tag: "li",
        attributes: {},
        children: option.text,
      })),
    });
  }

  return qObj;
}

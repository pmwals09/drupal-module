import { Question } from "../../models/question.js";
import { Option } from "../../models/questionOption.js";
import { Persona } from "../../models/persona.js";
import { DataVizConfig } from "../../models/dataVizConfig.js";
import { images } from "../../assets/images/index.js";

const BAR = "bar";
const PIE = "pie";
const SENTIMENT = "sentiment";

const ONBOARDING = "onboarding";
const RESOURCES = "resources";
const INFRASTRUCTURE = "infrastructure";
const CULTURE = "culture";
const CIRCULAR_ECONOMY = "circularEconomy";

const TONI = new Persona({ name: "Toni" });
const MATEO = new Persona({ name: "Mateo" });
const NADIA = new Persona({ name: "Nadia" });

const onboarding = [
  new Question({
    topicId: ONBOARDING,
    questionId: "howOld",
    persona: NADIA,
    text: "Were you born B.C. (Before Cellphone)? How old are you?",
    shortText: "How old were respondents?",
    options: [
      /* A */ new Option({
        text: "13 and under",
      }),
      /* B */ new Option({
        text: "14-19",
      }),
      /* C */ new Option({
        text: "20-29",
      }),
      /* D */ new Option({
        text: "30-39",
      }),
      /* E */ new Option({
        text: "40-49",
      }),
      /* F */ new Option({
        text: "50-59",
      }),
      /* G */ new Option({
        text: "60+",
      }),
    ],
    defaultNext: "end",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.resources4,
      timeout: 1000 * 38,
    }),
    responseFormatter: (percent) => `${percent}% of visitors are too.`,
  }),
  new Question({
    topicId: ONBOARDING,
    questionId: "time",
    persona: TONI,
    text: "Ok! So how much time do you think you spend using your phone every day?",
    shortText: "How many hours do you think you spend on your phone every day?",
    options: [
      /* A */ new Option({
        text: "2 hours a day or less",
        shortText: "Fewer than 2",
      }),
      /* B */ new Option({ text: "3 to 5 hours", shortText: "3 to 5" }),
      /* C */ new Option({ text: "5 to 7 hours", shortText: "5 to 7" }),
      /* D */ new Option({ text: "7+ hours", shortText: "More than 7" }),
    ],
    defaultNext: "memes",
    dataViz: new DataVizConfig({
      chartType: PIE,
      images: images.dataViz.charts.onboarding1,
      timeout: 1000 * 21,
    }),
    responseFormatter: (percent) => `${percent}% of visitors do too!`,
  }),
  new Question({
    topicId: ONBOARDING,
    questionId: "memes",
    persona: MATEO,
    text: "What about you? Meme fan?",
    shortText: "Are you a fan of memes?",
    options: [
      /* A */ new Option({
        text: "Love em! Give me all the memes.",
        shortText: "Love them",
      }),
      /* B */ new Option({ text: "I like", shortText: "Like them" }),
      /* C */ new Option({ text: "On occasion", shortText: "Occasionally" }),
      /* D */ new Option({ text: "Not really my jam" }),
    ],
    defaultNext: "howOld",
    dataViz: new DataVizConfig({
      chartType: PIE,
      images: images.dataViz.charts.onboarding2,
      timeout: 1000 * 23,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors feel the same way.`,
  }),
];

const resources = [
  new Question({
    topicId: RESOURCES,
    questionId: "poundsCo2",
    persona: MATEO,
    text: "What do you think?",
    shortText:
      "80% of a phone’s carbon footprint is from production. What do visitors think?",
    options: [
      /* A */ new Option({ text: "10 percent", shortText: "10%" }),
      /* B */ new Option({ text: "25 percent", shortText: "25%" }),
      /* C */ new Option({ text: "50 percent", shortText: "50%" }),
      /* D */ new Option({
        text: "More than 75 percent",
        shortText: "More than 75%",
      }),
    ],
    defaultNext: "fairTrade",
    dataViz: new DataVizConfig({
      chartType: PIE,
      images: images.dataViz.charts.resources1,
      timeout: 1000 * 35,
    }),
    responseFormatter: (percent) => `${percent}% of visitors thought so too.`,
  }),
  new Question({
    topicId: RESOURCES,
    questionId: "fairTrade",
    persona: TONI,
    text: "Are you willing to pay more for a phone made under sustainability and fair-trade guidelines?",
    shortText:
      "How much more would you pay for a sustainable, ethically made phone?",
    options: [
      /* A */ new Option({ text: "No", shortText: "Nothing" }),
      /* B */ new Option({ text: "Yes - $50 more", shortText: "$50 more" }),
      /* C */ new Option({ text: "Yes - $100 more", shortText: "$100 more" }),
      /* D */ new Option({
        text: "Yes - Whatever it takes",
        shortText: "Whatever it takes",
      }),
    ],
    defaultNext: "howOftenNew",
    dataViz: new DataVizConfig({
      chartType: PIE,
      images: images.dataViz.charts.resources2,
      timeout: 1000 * 28,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors picked the same answer.`,
  }),
  new Question({
    topicId: RESOURCES,
    questionId: "howOftenNew",
    persona: MATEO,
    text: "How often do you get a new phone?",
    options: [
      /* A */ new Option({
        text: "Every six months or so",
        shortText: "Every six months",
      }),
      /* B */ new Option({ text: "Every year" }),
      /* C */ new Option({
        text: "Every 2 to 3 years",
        shortText: "2 to 3 years",
      }),
      /* D */ new Option({
        text: "Every 4 to 5 years",
        shortText: "4 to 5 years",
      }),
      /* E */ new Option({
        text: "I've had mine 5 years or longer",
        shortText: "More than 5 years",
      }),
    ],
    defaultNext: "end",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.resources3,
      timeout: 1000 * 29,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered the same way.`,
  }),
  new Question({
    topicId: RESOURCES,
    questionId: "whatMakesGetNew",
    persona: NADIA,
    text: "What makes you get a new phone?",
    options: [
      /* A */ new Option({ text: "A new model comes out" }),
      /* B */ new Option({
        text: "My friends tease me about my phone",
        shortText: "My friends tease me",
      }),
      /* C */ new Option({
        text: "It breaks (and can't be fixed)",
        shortText: "It breaks (not fixable)",
      }),
      /* D */ new Option({
        text: "It breaks (even if it could be fixed)",
        shortText: "It breaks (fixable)",
      }),
      /* E */ new Option({
        text: "I get a hand-me-down phone when someone gets a new one",
        shortText: "I get a hand-me-down",
      }),
      /* F */ new Option({ text: "I just feel like it" }),
    ],
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.resources4,
      timeout: 1000 * 35,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors picked that answer too.`,
  }),
];

const infrastructure = [
  new Question({
    topicId: INFRASTRUCTURE,
    questionId: "infraFacts",
    persona: NADIA,
    text: "Here are some facts about cellphone infrastructure. Which one surprises you the most?",
    shortText: "What surprises you most about cellphone infrastructure?",
    options: [
      /* A */ new Option({
        text: "There are no satellites (yet)!",
        nextId: "infraSatellites",
      }),
      /* B */ new Option({
        text: "There are 700,000 miles of undersea cables",
        nextId: "infraSatellites",
      }),
      /* C */ new Option({
        text: "Your phone is basically a radio",
        nextId: "infraRadio",
      }),
      /* D */ new Option({
        text: "The frequencies cellphones use are limited, and we could run out!",
        nextId: "infraRadio",
      }),
    ],
    defaultNext: "infraRadio",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.infrastructure1,
      timeout: 1000 * 34,
    }),
    responseFormatter: (percent) => `${percent}% of visitors picked that too.`,
  }),
];

const culture = [
  new Question({
    topicId: CULTURE,
    questionId: "connectCulture",
    persona: NADIA,
    text: "What about you? How do you use your phone the most to connect with your culture?",
    shortText: "How do you use your phone to connect with your culture?",
    options: [
      /* A */ new Option({
        text: "I use apps related to my culture (language, recipes, fashion, etc.)",
        shortText: "Use apps related to culture",
        nextId: "hasCulture",
      }),
      /* B */ new Option({
        text: "I talk to relatives and friends outside the U.S.",
        shortText: "Talk to loved ones outside the U.S.",
        nextId: "hasCulture",
      }),
      /* C */ new Option({
        text: "I follow people on social who share my background",
        shortText: "Follow people on social who share my background",
        nextId: "hasCulture",
      }),
      /* D */ new Option({
        text: "Culture? Do I even have that?",
        shortText: "I don't",
        nextId: "noHasCulture",
      }),
    ],
    defaultNext: "hasCulture",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.culture1,
      timeout: 1000 * 30,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors picked the same answer.`,
  }),
  new Question({
    topicId: CULTURE,
    questionId: "texting",
    persona: TONI,
    text: "Huh. Have smartphones and texting changed what's polite? Do you make voice calls?",
    shortText: "Do you still make voice calls?",
    options: [
      /* A */ new Option({
        text: "Yes, I make calls all the time!",
        shortText: "Frequently",
      }),
      /* B */ new Option({
        text: "Occasionally, when it's too long for a text",
        shortText: "Sometimes",
      }),
      /* C */ new Option({
        text: "Only when it's urgent",
        shortText: "Only when urgent",
      }),
      /* D */ new Option({
        text: "Only if I text first to ask if it's ok",
        shortText: "Only with permission",
      }),
      /* E */ new Option({
        text: "OMG never!!",
        shortText: "Never",
      }),
    ],
    defaultNext: "customization",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.culture2,
      timeout: 1000 * 27,
    }),
    responseFormatter: (percent) => `${percent}% of visitors agree with you.`,
  }),
  new Question({
    topicId: CULTURE,
    questionId: "customization",
    persona: NADIA,
    text: "How do you modify your device to express yourself?",
    options: [
      /* A */ new Option({ text: "Lock screen photo" }),
      /* B */ new Option({ text: "Case/decorations" }),
      /* C */ new Option({ text: "Ringtone/notification sounds" }),
      /* D */ new Option({ text: "How my apps are arranged" }),
      /* E */ new Option({ text: "All of the above" }),
    ],
    defaultNext: "end",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.culture3,
      timeout: 1000 * 34,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered the same way.`,
  }),
];

const circularEconomy = [
  new Question({
    topicId: CIRCULAR_ECONOMY,
    questionId: "oldPhone",
    persona: NADIA,
    text: "When you got a new phone, what did you do with your old one?",
    options: [
      /* A */ new Option({ text: "Kept it" }),
      /* B */ new Option({ text: "Threw it away" }),
      /* C */ new Option({ text: "Traded it in" }),
      /* D */ new Option({ text: "Gave it to someone" }),
      /* E */ new Option({ text: "Recycled it" }),
      /* F */ new Option({
        text: "None of the above - but that's my business!",
        shortText: "None of the above",
      }),
    ],
    defaultNext: "repair",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.circularEconomy1,
      timeout: 1000 * 35,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered that too!`,
  }),
  new Question({
    topicId: CIRCULAR_ECONOMY,
    questionId: "repair",
    persona: MATEO,
    text: "Have you ever had your cell phone repaired?",
    options: [
      /* A */ new Option({ text: "Yes, I did it myself" }),
      /* B */ new Option({ text: "Yes, at a repair shop" }),
      /* C */ new Option({ text: "No, not sure where to start" }),
      /* D */ new Option({ text: "No, I got a new one" }),
      /* E */ new Option({ text: "No, I've never needed to" }),
    ],
    defaultNext: "end",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.circularEconomy2,
      timeout: 1000 * 34,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors picked the same answer.`,
  }),
];

const influence = [
  new Question({
    topicId: "influence",
    questionId: "noPhoneFeeling",
    persona: NADIA,
    text: "What's the strongest feeling you have when you're without your phone?",
    shortText: "How do you feel without your phone?",
    options: [
      /* A */ new Option({ text: "Panicked" }),
      /* B */ new Option({ text: "Frustrated" }),
      /* C */ new Option({ text: "Peaceful" }),
      /* D */ new Option({ text: "Liberated" }),
      /* E */ new Option({ text: "I don't notice" }),
    ],
    defaultNext: "authentic",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence1,
      timeout: 1000 * 30,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors felt that way too.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "authentic",
    persona: NADIA,
    text: "What do you think? Does cellphone technology allow you to be a more authentic version of yourself?",
    shortText: "Does cellphone technology allow you to be more authentic?",
    options: [
      /* A */ new Option({ text: "Definitely not" }),
      /* B */ new Option({ text: "Not really" }),
      /* C */ new Option({
        text: "Sometimes yes, sometimes no",
        shortText: "Sometimes",
      }),
      /* D */ new Option({ text: "Yeah, kinda" }),
      /* E */ new Option({ text: "Absolutely" }),
    ],
    defaultNext: "disconnect",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence2,
      timeout: 1000 * 31,
    }),
    responseFormatter: (percent) => `${percent}% of visitors think so too.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "disconnect",
    persona: TONI,
    text: "How long are you willing to disconnect from your phone?",
    options: [
      /* A */ new Option({ text: "Less than an hour" }),
      /* B */ new Option({ text: "A few hours" }),
      /* C */ new Option({ text: "A day" }),
      /* D */ new Option({ text: "More than a day" }),
    ],
    defaultNext: "connected",
    dataViz: new DataVizConfig({
      chartType: PIE,
      images: images.dataViz.charts.influence3,
      timeout: 1000 * 25,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered the same way.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "connected",
    persona: TONI,
    text: "Scale of 1-5. Does technology make you feel less connected (1) or more connected (5)?",
    shortText: "Does technology make you feel less or more connected?",
    options: [
      /* A */ new Option({
        text: "",
        letter: "1",
        shortText: "Much more connected",
      }),
      /* B */ new Option({
        text: "",
        letter: "2",
        shortText: "More connected",
      }),
      /* C */ new Option({
        text: "",
        letter: "3",
        shortText: "Moderately connected",
      }),
      /* D */ new Option({
        text: "",
        letter: "4",
        shortText: "Less connected",
      }),
      /* E */ new Option({
        text: "",
        letter: "5",
        shortText: "Much less connected",
      }),
    ],
    defaultNext: "futureAnxious",
    shouldAskOptions: false,
    dataViz: new DataVizConfig({
      chartType: SENTIMENT,
      images: images.dataViz.charts.influence4,
      timeout: 1000 * 29,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors also feel that way.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "futureAnxious",
    persona: TONI,
    text: "Does technology make you feel anxious about the future (1) or excited about the future (5)?",
    shortText:
      "Does technology make you feel anxious or excited about the future?",
    options: [
      /* A */ new Option({ text: "", letter: "1", shortText: "Very anxious" }),
      /* B */ new Option({ text: "", letter: "2", shortText: "Anxious" }),
      /* C */ new Option({
        text: "",
        letter: "3",
        shortText: "Neither anxious nor excited",
      }),
      /* D */ new Option({ text: "", letter: "4", shortText: "Excited" }),
      /* E */ new Option({ text: "", letter: "5", shortText: "Very excited" }),
    ],
    defaultNext: "inControl",
    shouldAskOptions: false,
    dataViz: new DataVizConfig({
      chartType: SENTIMENT,
      images: images.dataViz.charts.influence5,
      timeout: 1000 * 29,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors feel that way too.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "inControl",
    persona: TONI,
    text: "Does it make you feel less in control of your life (1) or more in control (5)?",
    shortText: "Does technology make you feel less or more in control?",
    options: [
      /* A */ new Option({
        text: "",
        letter: "1",
        shortText: "Much less in control",
      }),
      /* B */ new Option({
        text: "",
        letter: "2",
        shortText: "Less in control",
      }),
      /* C */ new Option({ text: "", letter: "3", shortText: "No change" }),
      /* D */ new Option({
        text: "",
        letter: "4",
        shortText: "More in control",
      }),
      /* E */ new Option({
        text: "",
        letter: "5",
        shortText: "Much more in control",
      }),
    ],
    defaultNext: "liveConcertVideo",
    shouldAskOptions: false,
    dataViz: new DataVizConfig({
      chartType: SENTIMENT,
      images: images.dataViz.charts.influence6,
      timeout: 1000 * 29,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered the same.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "liveConcertVideo",
    persona: MATEO,
    text: "Ok my turn. What about taking videos? Is it okay to take and post a video of a live concert, even though they say not to?",
    shortText: "Is it okay to take a video of a live concert?",
    options: [
      /* A */ new Option({ text: "Yes" }),
      /* B */ new Option({ text: "Maybe" }),
      /* C */ new Option({ text: "No" }),
    ],
    defaultNext: "metroFightVideo",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence7,
      timeout: 1000 * 21,
    }),
    responseFormatter: (percent) => `${percent}% of visitors agree with you.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "metroFightVideo",
    persona: MATEO,
    text: "What about filming a fight on the Metro?",
    shortText: "Is it okay to take a video of a fight on the Metro?",
    options: [
      /* A */ new Option({ text: "Yes" }),
      /* B */ new Option({ text: "Maybe" }),
      /* C */ new Option({ text: "No" }),
    ],
    defaultNext: "policeArrestVideo",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence8,
      timeout: 1000 * 21,
    }),
    responseFormatter: (percent) => `${percent}% of visitors think so too.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "policeArrestVideo",
    persona: MATEO,
    text: "Okay, what about filming the police arresting someone?",
    shortText: "Is it okay to take a video of the police arresting someone?",
    options: [
      /* A */ new Option({ text: "Yes" }),
      /* B */ new Option({ text: "Maybe" }),
      /* C */ new Option({ text: "No" }),
    ],
    defaultNext: "teacherAbuseVideo",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence9,
      timeout: 1000 * 21,
    }),
    responseFormatter: (percent) => `${percent}% of visitors agree.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "teacherAbuseVideo",
    persona: MATEO,
    text: "Would you take a video of a teacher verbally abusing a student?",
    shortText:
      "Is it okay to take a video of a teacher verbally abusing a student?",
    options: [
      /* A */ new Option({ text: "Yes" }),
      /* B */ new Option({ text: "Maybe" }),
      /* C */ new Option({ text: "No" }),
    ],
    defaultNext: "privacy",
    dataViz: new DataVizConfig({
      chartType: BAR,
      images: images.dataViz.charts.influence10,
      timeout: 1000 * 21,
    }),
    responseFormatter: (percent) =>
      `${percent}% of visitors answered the same way.`,
  }),
  new Question({
    topicId: "influence",
    questionId: "privacy",
    persona: TONI,
    // NOTE: This was originally several p-tags - should this behave like the
    // children prop and accept a string or an array of elements?
    text: "Well I've got one more. Last one. Where do you stand on privacy vs. convenience, on a scale of 1-5? 1 means you want privacy even if you have to give up A LOT of convenience. 5 means you want convenience, even if you have to give up A LOT of privacy.",
    shortText: "Do you prefer privacy or convenience?",
    options: [
      /* A */ new Option({
        text: "",
        letter: "1",
        shortText: "Much more privacy",
      }),
      /* B */ new Option({ text: "", letter: "2", shortText: "More privacy" }),
      /* C */ new Option({
        text: "",
        letter: "3",
        shortText: "Equal amounts convenience and privacy",
      }),
      /* D */ new Option({
        text: "",
        letter: "4",
        shortText: "More convenience",
      }),
      /* E */ new Option({
        text: "",
        letter: "5",
        shortText: "Much more convenience",
      }),
    ],
    defaultNext: "end",
    shouldAskOptions: false,
    dataViz: new DataVizConfig({
      chartType: SENTIMENT,
      images: images.dataViz.charts.influence11,
      timeout: 1000 * 30,
    }),
    responseFormatter: (percent) => `${percent}% of visitors agree with you.`,
  }),
];

export const chartableQuestions = [
  ...onboarding,
  ...resources,
  ...infrastructure,
  ...culture,
  ...circularEconomy,
  ...influence,
];

export default [
  ...chartableQuestions,
  new Question({
    topicId: ONBOARDING,
    questionId: "firstTime",
    persona: TONI,
    text: "Are you joining for the first time?",
    options: [
      /* Yes */ new Option({
        text: "",
        letter: "Yes",
        nextId: "shouldContinue",
      }),
      /* No */ new Option({
        text: "",
        letter: "No",
        nextId: "couldSkip",
      }),
    ],
    shouldAskOptions: false,
  }),
];

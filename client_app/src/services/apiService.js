/* eslint-disable import/prefer-default-export */
import axios from "axios";

// eslint-disable-next-line no-unused-vars
const httpClient = axios.create({
  baseUrl: window.location.origin,
});

class GetResponseError extends Error {}
export const api = {
  async getResponses() {
    try {
      const res = await fetch("/data/submission/total/report");
      if (res.ok) {
        try {
          const json = await res.json();
          return json;
        } catch (e) {
          throw new GetResponseError(
            `Issue fetching report data: ${e.message}`
          );
        }
      } else {
        throw new GetResponseError(
          `Issue fetching report data: ${res.status}, ${res.statusText}`
        );
      }
    } catch (e) {
      throw new GetResponseError(`Issue fetching report data: ${e.message}`);
    }
  },
  async submitResponse(formData) {
    fetch("/data/submission/responses/save", {
      body: formData,
      method: "POST",
    });
  },
};

export const mock = {
  progress: {
    getProgress: mockGetProgress,
    setProgress: mockSetProgress,
  },
  report: {
    getAll: mockGetAllReport,
    saveResponse: mockSaveResponse,
  },
};

function mockSaveResponse(_req, res, ctx) {
  return res(ctx.status(200));
}

const onboardingHowOld = [
  {
    question: "onboarding.howOld",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "E",
    location: "nmnh",
    answer_count: 5,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "F",
    location: "nmnh",
    answer_count: 6,
    year: 2023,
    month: 6,
    day: 3,
  },
  {
    question: "onboarding.howOld",
    answer: "G",
    location: "nmnh",
    answer_count: 7,
    year: 2023,
    month: 6,
    day: 3,
  },
];

const onboardingTime = [
  {
    question: "onboarding.time",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "onboarding.time",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "onboarding.time",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "onboarding.time",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 3,
    day: 28,
  },
];

const onboardingMemes = [
  {
    question: "onboarding.memes",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "onboarding.memes",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "onboarding.memes",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "onboarding.memes",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const resourcesPoundsCo2 = [
  {
    question: "resources.poundsCo2",
    answer: "A",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.poundsCo2",
    answer: "B",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.poundsCo2",
    answer: "C",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.poundsCo2",
    answer: "D",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
];

const resourcesFairTrade = [
  {
    question: "resources.fairTrade",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.fairTrade",
    answer: "B",
    location: "other",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.fairTrade",
    answer: "C",
    location: "other",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.fairTrade",
    answer: "D",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
];

const resoucesHowOftenNew = [
  {
    question: "resources.howOftenNew",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.howOftenNew",
    answer: "B",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.howOftenNew",
    answer: "C",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.howOftenNew",
    answer: "D",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.howOftenNew",
    answer: "E",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
];

const resoucesWhatMakesGetNew = [
  {
    question: "resources.whatMakesGetNew",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.whatMakesGetNew",
    answer: "B",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.whatMakesGetNew",
    answer: "C",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.whatMakesGetNew",
    answer: "D",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.whatMakesGetNew",
    answer: "E",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "resources.whatMakesGetNew",
    answer: "F",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
];

const infrastructureInfraFacts = [
  {
    question: "infrastructure.infraFacts",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "infrastructure.infraFacts",
    answer: "B",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "infrastructure.infraFacts",
    answer: "C",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
  {
    question: "infrastructure.infraFacts",
    answer: "D",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 3,
  },
];

const cultureConnectCulture = [
  {
    question: "culture.connectCulture",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.connectCulture",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.connectCulture",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.connectCulture",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 3,
    day: 28,
  },
];

const cultureTexting = [
  {
    question: "culture.texting",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.texting",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.texting",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.texting",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.texting",
    answer: "E",
    location: "nmnh",
    answer_count: 5,
    year: 2023,
    month: 3,
    day: 28,
  },
];

const cultureCustomization = [
  {
    question: "culture.customization",
    answer: "A",
    location: "nmnh",
    answer_count: 1,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.customization",
    answer: "B",
    location: "nmnh",
    answer_count: 2,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.customization",
    answer: "C",
    location: "nmnh",
    answer_count: 3,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.customization",
    answer: "D",
    location: "nmnh",
    answer_count: 4,
    year: 2023,
    month: 3,
    day: 28,
  },
  {
    question: "culture.customization",
    answer: "E",
    location: "nmnh",
    answer_count: 5,
    year: 2023,
    month: 3,
    day: 28,
  },
];

const circularEconomyOldPhone = [
  {
    question: "circularEconomy.oldPhone",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.oldPhone",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.oldPhone",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.oldPhone",
    answer: "D",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.oldPhone",
    answer: "E",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.oldPhone",
    answer: "F",
    answer_count: 6,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const circularEconomyRepair = [
  {
    question: "circularEconomy.repair",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.repair",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.repair",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.repair",
    answer: "D",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "circularEconomy.repair",
    answer: "E",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceNoPhoneFeeling = [
  {
    question: "influence.noPhoneFeeling",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.noPhoneFeeling",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.noPhoneFeeling",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.noPhoneFeeling",
    answer: "D",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.noPhoneFeeling",
    answer: "E",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceAuthentic = [
  {
    question: "influence.authentic",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.authentic",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.authentic",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.authentic",
    answer: "D",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.authentic",
    answer: "E",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceDisconnect = [
  {
    question: "influence.disconnect",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.disconnect",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.disconnect",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.disconnect",
    answer: "D",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceConnected = [
  {
    question: "influence.connected",
    answer: "1",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.connected",
    answer: "2",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.connected",
    answer: "3",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.connected",
    answer: "4",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.connected",
    answer: "5",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceFutureAnxious = [
  {
    question: "influence.futureAnxious",
    answer: "1",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.futureAnxious",
    answer: "2",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.futureAnxious",
    answer: "3",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.futureAnxious",
    answer: "4",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.futureAnxious",
    answer: "5",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceInControl = [
  {
    question: "influence.inControl",
    answer: "1",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.inControl",
    answer: "2",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.inControl",
    answer: "3",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.inControl",
    answer: "4",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.inControl",
    answer: "5",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceLiveConcertVideo = [
  {
    question: "influence.liveConcertVideo",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.liveConcertVideo",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.liveConcertVideo",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceMetroFightVideo = [
  {
    question: "influence.metroFightVideo",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.metroFightVideo",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.metroFightVideo",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influencePoliceArrestVideo = [
  {
    question: "influence.policeArrestVideo",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.policeArrestVideo",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.policeArrestVideo",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influenceTeacherAbuseVideo = [
  {
    question: "influence.teacherAbuseVideo",
    answer: "A",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.teacherAbuseVideo",
    answer: "B",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.teacherAbuseVideo",
    answer: "C",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
];

const influencePrivacy = [
  {
    question: "influence.privacy",
    answer: "1",
    answer_count: 1,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.privacy",
    answer: "2",
    answer_count: 2,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.privacy",
    answer: "3",
    answer_count: 3,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.privacy",
    answer: "4",
    answer_count: 4,
    year: 2023,
    month: 5,
    day: 1,
  },
  {
    question: "influence.privacy",
    answer: "5",
    answer_count: 5,
    year: 2023,
    month: 5,
    day: 1,
  },
];

function mockGetAllReport(_req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json([
      ...onboardingHowOld,
      ...onboardingTime,
      ...onboardingMemes,
      ...resourcesPoundsCo2,
      ...resourcesFairTrade,
      ...resoucesHowOftenNew,
      ...resoucesWhatMakesGetNew,
      ...infrastructureInfraFacts,
      ...cultureConnectCulture,
      ...cultureTexting,
      ...cultureCustomization,
      ...circularEconomyOldPhone,
      ...circularEconomyRepair,
      ...influenceNoPhoneFeeling,
      ...influenceAuthentic,
      ...influenceDisconnect,
      ...influenceConnected,
      ...influenceFutureAnxious,
      ...influenceInControl,
      ...influenceLiveConcertVideo,
      ...influenceMetroFightVideo,
      ...influencePoliceArrestVideo,
      ...influenceTeacherAbuseVideo,
      ...influencePrivacy,
    ])
  );
}

function mockGetProgress(_req, res, ctx) {
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        onboarding: 0,
        resources: 1,
        infrastructure: 1,
        culture: 2,
        circularEconomy: 1,
        influence: 2,
      },
      method: "GET",
      status: 200,
    })
  );
}

let progress = {};
async function mockSetProgress(req, res, ctx) {
  const reqBody = await req.json();
  progress = { ...progress, ...reqBody };
  return res(
    ctx.status(200),
    ctx.json({
      data: progress,
      method: "POST",
      status: 200,
    })
  );
}

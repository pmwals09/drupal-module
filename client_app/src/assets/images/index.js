import { DataVizImage } from "../../models/dataVizImage.js";
import { Persona } from "../../models/persona.js";
import dataVizPlaceholder from "./1_datavizplaceholderbig copy.jpg";
import wavyCat from "./3_wavycat.gif";
import zombieBaby from "./4_zombiebaby.png";
import newPhone from "./Nadiawhenanewphonecomesout.gif";
import noSignal from "./freddie_mercury.png";
import speedyCat from "./2_speedycat.gif";
import moreSpectrum from "./sciencing_fast.png";
import flyingCat from "./1_flyingcat.gif";
import tooManyCalls from "./3_toomanyphonecalls.png";
import accessories from "./4_accessorizingcat.png";
import landlineFear from "./2_butterbean_landline.gif";
import couchWarmer from "./1_catwarmer.png";
import scaredCat from "./1_catscared.png";
import circularEconomy1 from "./Circular Economy 1of2 (LEFT) - Nadia.png";
import circularEconomy2 from "./Circular Economy 2of2 (LEFT) - Mateo.png";
import culture1 from "./Culture 1of3 (LEFT) - Nadia.png";
import culture2 from "./MateoToni-RightSide.png";
import culture3 from "./Culture 3of3 (LEFT) - Nadia.png";
import influence1 from "./Influence 1of11 (LEFT) - Nadia.png";
import influence2 from "./Influence 2of11 (RIGHT) - Nadia.png";
import influence3 from "./Influence 3of11 (LEFT) - Toni.png";
import influence4 from "./Influence 4of11 (LEFT) - Toni.png";
import influence5 from "./Influence 5of11 (RIGHT) - Toni.png";
import influence6 from "./Influence 6of11 (LEFT) - Toni.png";
import influence7 from "./Influence 7of11 (LEFT) - Mateo.png";
import influence8 from "./Influence 8of11 (RIGHT) - Mateo.png";
import influence9 from "./ToniMateo-LeftSide.png";
import influence10 from "./Influence 10of11 (RIGHT) - Mateo.png";
import influence11 from "./Influence 11of11 (LEFT) - Toni.png";
import onboarding1 from "./Onboarding 1of2 (LEFT) - Toni.png";
import onboarding2 from "./MateoPhoneInAir-Right.png";
import infrastructure1 from "./Infrastructure 1of1 (LEFT) - Nadia.png";
import resources1 from "./Resources 1of4 (LEFT) - Mateo.png";
import resources2 from "./Resources 2of4 (RIGHT) - Toni.png";
import resources3 from "./MateoPhoneInAir-Left.png";
import resources4 from "./NadiaSittingSelfie-Right.png";
import onboardingTitlePersona from "./MateoTonieNadiaBB-Group-Right.png";
import onboardingTitleTexture from "./onboardingTitleTexture.png";
import resourcesTitlePersona from "./resourcesTitlePersona.png";
import resourcesTitleTexture from "./resourcesTitleTexture.png";
import infrastructureTitlePersona from "./infrastructureTitlePersona.png";
import infrastructureTitleTexture from "./infrastructureTitleTexture.png";
import cultureTitlePersona from "./cultureTitlePersona.png";
import cultureTitleTexture from "./cultureTitleTexture.png";
import circularEconomyTitlePersona from "./circularEconomyTitlePersona.png";
import circularEconomyTitleTexture from "./circularEconomyTitleTexture.png";
import influenceTitlePersona from "./influenceTitlePersona.png";
import influenceTitleTexture from "./influenceTitleTexture.png";

const LEFT = "left";
const RIGHT = "right";
const TEXTURE = "texture";

const TONI = new Persona({ name: "Toni" });
const MATEO = new Persona({ name: "Mateo" });
const NADIA = new Persona({ name: "Nadia" });

export const images = {
  script: {
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
  },
  dataViz: {
    charts: {
      circularEconomy1: {
        persona: new DataVizImage({
          src: circularEconomy1,
          persona: NADIA,
          orientation: LEFT,
        }),
      },
      circularEconomy2: {
        persona: new DataVizImage({
          src: circularEconomy2,
          persona: MATEO,
          orientation: LEFT,
        }),
      },
      culture1: {
        persona: new DataVizImage({
          src: culture1,
          persona: NADIA,
          orientation: LEFT,
        }),
      },
      culture2: {
        persona: new DataVizImage({
          src: culture2,
          persona: TONI,
          orientation: RIGHT,
        }),
      },
      culture3: {
        persona: new DataVizImage({
          src: culture3,
          persona: NADIA,
          orientation: LEFT,
        }),
      },
      influence1: {
        persona: new DataVizImage({
          src: influence1,
          persona: NADIA,
          orientation: LEFT,
        }),
      },
      influence2: {
        persona: new DataVizImage({
          src: influence2,
          persona: NADIA,
          orientation: RIGHT,
        }),
      },
      influence3: {
        persona: new DataVizImage({
          src: influence3,
          persona: TONI,
          orientation: LEFT,
        }),
      },
      influence4: {
        persona: new DataVizImage({
          src: influence4,
          persona: TONI,
          orientation: LEFT,
        }),
      },
      influence5: {
        persona: new DataVizImage({
          src: influence5,
          persona: TONI,
          orientation: RIGHT,
        }),
      },
      influence6: {
        persona: new DataVizImage({
          src: influence6,
          persona: TONI,
          orientation: LEFT,
        }),
      },
      influence7: {
        persona: new DataVizImage({
          src: influence7,
          persona: MATEO,
          orientation: LEFT,
        }),
      },
      influence8: {
        persona: new DataVizImage({
          src: influence8,
          persona: MATEO,
          orientation: RIGHT,
        }),
      },
      influence9: {
        persona: new DataVizImage({
          src: influence9,
          persona: MATEO,
          orientation: LEFT,
        }),
      },
      influence10: {
        persona: new DataVizImage({
          src: influence10,
          persona: MATEO,
          orientation: RIGHT,
        }),
      },
      influence11: {
        persona: new DataVizImage({
          src: influence11,
          persona: TONI,
          orientation: LEFT,
        }),
      },
      onboarding1: {
        persona: new DataVizImage({
          src: onboarding1,
          persona: TONI,
          orientation: LEFT,
        }),
      },
      onboarding2: {
        persona: new DataVizImage({
          src: onboarding2,
          persona: MATEO,
          orientation: RIGHT,
        }),
      },
      infrastructure1: {
        persona: new DataVizImage({
          src: infrastructure1,
          persona: NADIA,
          orientation: LEFT,
        }),
      },
      resources1: {
        persona: new DataVizImage({
          src: resources1,
          persona: MATEO,
          orientation: LEFT,
        }),
      },
      resources2: {
        persona: new DataVizImage({
          src: resources2,
          persona: TONI,
          orientation: RIGHT,
        }),
      },
      resources3: {
        persona: new DataVizImage({
          src: resources3,
          persona: MATEO,
          orientation: LEFT,
        }),
      },
      resources4: {
        persona: new DataVizImage({
          src: resources4,
          persona: NADIA,
          orientation: RIGHT,
        }),
      },
    },
    titles: {
      get onboarding() {
        const orientation = RIGHT;
        return {
          persona: new DataVizImage({
            src: onboardingTitlePersona,
            persona: TONI,
            orientation,
          }),
          texture: new DataVizImage({
            src: onboardingTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
      get resources() {
        const orientation = LEFT;
        return {
          persona: new DataVizImage({
            src: resourcesTitlePersona,
            persona: MATEO,
            orientation,
          }),
          texture: new DataVizImage({
            src: resourcesTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
      get infrastructure() {
        const orientation = RIGHT;
        return {
          persona: new DataVizImage({
            src: infrastructureTitlePersona,
            persona: NADIA,
            orientation,
          }),
          texture: new DataVizImage({
            src: infrastructureTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
      get culture() {
        const orientation = RIGHT;
        return {
          persona: new DataVizImage({
            src: cultureTitlePersona,
            persona: TONI,
            orientation,
          }),
          texture: new DataVizImage({
            src: cultureTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
      get circularEconomy() {
        const orientation = LEFT;
        return {
          persona: new DataVizImage({
            src: circularEconomyTitlePersona,
            persona: MATEO,
            orientation,
          }),
          texture: new DataVizImage({
            src: circularEconomyTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
      get influence() {
        const orientation = LEFT;
        return {
          persona: new DataVizImage({
            src: influenceTitlePersona,
            persona: NADIA,
            orientation,
          }),
          texture: new DataVizImage({
            src: influenceTitleTexture,
            type: TEXTURE,
            orientation,
          }),
        };
      },
    },
  },
};

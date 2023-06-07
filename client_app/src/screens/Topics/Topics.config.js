import { ReactComponent as OnboardingIcon } from "../../assets/svg/onboarding.svg";
import { ReactComponent as ResourcesIcon } from "../../assets/svg/resources.svg";
import { ReactComponent as InfrastructureIcon } from "../../assets/svg/infrastructure.svg";
import { ReactComponent as CultureIcon } from "../../assets/svg/culture.svg";
import { ReactComponent as CircularEconomyIcon } from "../../assets/svg/circular-economy.svg";
import { ReactComponent as InfluenceIcon } from "../../assets/svg/influence.svg";
import { TopicConfig } from "../../models/topicConfig.js";
import { ColorConfig } from "../../models/colorConfig.js";
import { TopicDataVizConfig } from "../../models/topicDataVizConfig.js";
// eslint-disable-next-line import/extensions
import { images } from "../../assets/images";

const RIGHT = "right";
const LEFT = "left";

export const topicsConfig = [
  new TopicConfig({
    color: new ColorConfig({
      primary: "#DC248F",
      rangeStart: "#FFD6E6",
      rangeEnd: "#FFF0F6",
      humanReadable: "magenta",
    }),
    icon: OnboardingIcon,
    mainTitle: "Onboarding",
    subTitle: "How does the group chat work?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.onboarding,
      orientation: RIGHT,
      customText: "How do visitors feel about their cellphones?",
    }),
  }),
  new TopicConfig({
    color: new ColorConfig({
      primary: "#0064AA",
      rangeStart: "#CEEBFF",
      rangeEnd: "#E3F3FF",
      humanReadable: "blue",
    }),
    icon: ResourcesIcon,
    mainTitle: "Resources",
    subTitle: "What goes into our cellphones?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.resources,
      orientation: LEFT,
    }),
  }),
  new TopicConfig({
    color: new ColorConfig({
      primary: "#00AA4B",
      rangeStart: "#C7F1DA",
      rangeEnd: "#E4F9ED",
      humanReadable: "green",
    }),
    icon: InfrastructureIcon,
    mainTitle: "Infrastructure",
    subTitle: "What makes our cellphones work?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.infrastructure,
      orientation: RIGHT,
    }),
  }),
  new TopicConfig({
    color: new ColorConfig({
      primary: "#F26B1C",
      rangeStart: "#FFDDC9",
      rangeEnd: "#FFEEE5",
      humanReadable: "orange",
    }),
    icon: CultureIcon,
    mainTitle: "Culture",
    subTitle: "How do people use their cellphones?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.culture,
      orientation: RIGHT,
    }),
  }),
  new TopicConfig({
    color: new ColorConfig({
      primary: "#FFD84C",
      rangeStart: "#FFEA9E",
      rangeEnd: "#FFF2C5",
      text: "#000",
      humanReadable: "yellow",
    }),
    icon: CircularEconomyIcon,
    mainTitle: "Circular Economy",
    subTitle: "What happens to our old cellphones?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.circularEconomy,
      orientation: LEFT,
    }),
  }),
  new TopicConfig({
    color: new ColorConfig({
      primary: "#74479B",
      rangeStart: "#F1E2FF",
      rangeEnd: "#F8F0FF",
      humanReadable: "purple",
    }),
    icon: InfluenceIcon,
    mainTitle: "Influence",
    subTitle: "How do cellphones shape our lives?",
    dataViz: new TopicDataVizConfig({
      images: images.dataViz.titles.influence,
      orientation: LEFT,
    }),
  }),
];

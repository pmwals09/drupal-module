/* eslint-disable react/jsx-filename-extension */
import { useLocation, Link } from "react-router-dom";
import { topicsConfig } from "../screens/Topics/Topics.config.js";
import { HeaderConfig } from "../models/headerConfig.js";
import { ReactComponent as Chevron } from "../assets/svg/right-chevron.svg";
import { useSpeech } from "./SpeechContext.jsx";

const topicsSettings = topicsConfig.map((configObj) =>
  configObj.toHeaderConfig()
);

const topicPageConfig = {
  text: "Topics",
  color: "#232232",
  nav: {
    left: null,
    right: () => {
      const location = useLocation();
      const { speak, cancel } = useSpeech();
      if (location.state) {
        return (
          <Link
            aria-label="Return to group chat"
            className="app-header__nav app-header__nav--right"
            to={location.state}
            onFocus={() => {
              cancel();
              speak({ text: "Return to group chat, link", forSr: false });
            }}
          >
            <Chevron className="app-header__nav__icon" />
          </Link>
        );
      }
      return null;
    },
  },
};

export const settings = [
  new HeaderConfig({
    route: "/chatbot/chat",
    ...topicPageConfig,
  }),
  new HeaderConfig({
    route: "/",
    ...topicPageConfig,
  }),
  ...topicsSettings,
];

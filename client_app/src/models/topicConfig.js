/* eslint-disable react/jsx-filename-extension */
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSpeech } from "../container/SpeechContext.jsx";
import { HeaderConfig } from "./headerConfig.js";
import { ReactComponent as Chevron } from "../assets/svg/right-chevron.svg";
import AvatarGroup from "../screens/Chat/AvatarGroup.jsx";
import { useFocusContext } from "../container/FocusContext.jsx";
import ResetButton from "../container/ResetButton.jsx";

export class TopicConfig {
  constructor({ color, icon, mainTitle, subTitle, dataViz }) {
    this._color = color;
    this._icon = icon;
    this._mainTitle = mainTitle;
    this._subTitle = subTitle;
    this._dataViz = dataViz;
  }

  get color() {
    return this._color;
  }

  set color(newColor) {
    this._color = newColor;
  }

  get icon() {
    return this._icon;
  }

  set icon(newIcon) {
    this._icon = newIcon;
  }

  get mainTitle() {
    return this._mainTitle;
  }

  set mainTitle(newTitle) {
    if (typeof newTitle === "string") {
      this._mainTitle = newTitle;
    } else {
      throw new Error("Invalid main title.");
    }
  }

  get subTitle() {
    return this._subTitle;
  }

  set subTitle(newTitle) {
    if (typeof newTitle === "string") {
      this._subTitle = newTitle;
    } else {
      throw new Error("Invalid main title.");
    }
  }

  get dataViz() {
    return this._dataViz;
  }

  set dataViz(newDataViz) {
    this._dataViz = newDataViz;
  }

  get key() {
    return this._mainTitle
      .split(" ")
      .map((word, i) => (i === 0 ? word.toLowerCase() : word))
      .join("");
  }

  toHeaderConfig() {
    return new HeaderConfig({
      route: `/chatbot/chat/${this.key}`,
      text: <AvatarGroup names={["Mateo", "Butterbean", "Toni", "Nadia"]} />,
      color: this.color.primary,
      nav: {
        left: () => {
          const [params] = useSearchParams();
          const isKiosk = params.get("kiosk");
          const { speak, cancel } = useSpeech();
          const { setFocusable, unsetFocusable } = useFocusContext();

          useEffect(
            () => () => {
              // remove this element from the focusable registry to avoid memory
              // leaks
              unsetFocusable("topicsNav");
            },
            []
          );

          return (
            <Link
              to={`/chatbot/chat${
                params.toString() ? `?${params.toString()}` : ""
              }`}
              role="navigation"
              aria-label="Topics"
              className="app-header__nav app-header__nav--left"
              state={`/chatbot/chat/${this.key}${isKiosk ? "?kiosk=true" : ""}`}
              onFocus={() => {
                cancel();
                speak({ text: "Topics, link." });
              }}
              // Add this link to the focusable registry to allow controlled
              // focusing from ChatInput where needed
              ref={(n) =>
                n ? setFocusable({ key: "topicsNav", element: n }) : null
              }
            >
              <Chevron
                className="app-header__nav__icon"
                style={{ fill: this.color.text }}
              />{" "}
              <span
                className="app-header__nav__text"
                style={{ color: this.color.text }}
              >
                Topics
              </span>
            </Link>
          );
        },
        right: (
          <div className="app-header__nav app-header__nav--right">
            <ResetButton />
          </div>
        ),
      },
    });
  }
}

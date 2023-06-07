import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Typing from "./Typing.jsx";
import "./Text.scss";
import { Persona } from "../../models/persona.js";

function Text({
  color,
  disableTyping,
  message,
  cb,
  scrollToBottom,
  shouldAutoScroll,
}) {
  const [typing, setTyping] = useState(isUser() ? false : !disableTyping);

  useEffect(() => {
    let timer;
    if (typing) {
      timer = setTimeout(() => {
        setTyping(false);
      }, message.duration(100));
    }
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typing && shouldAutoScroll) {
      scrollToBottom();
    } else if (!typing) {
      if (shouldAutoScroll) {
        scrollToBottom();
      }
      cb();
    }
  }, [typing]);

  function isUser() {
    return message.sender.name === "User";
  }

  return (
    <div className={`text${isUser() ? " text--user" : ""}`} aria-hidden>
      <div className="text__avatar">
        <img
          src={message.sender.avatar}
          alt={message.sender.shortDescription}
          aria-hidden={!message.avatarDescription}
        />
      </div>
      <div className="text__content">
        <h2 className="text__content__name" aria-label={message.sender.name}>
          {isUser() ? "You" : message.sender.name}
        </h2>
        <div className="text__content__bubble">
          <div
            className="text__content__bubble__tail"
            style={{ backgroundColor: color.rangeStart }}
          />
          <div
            className={`text__content__bubble__text${
              typing ? " text__content__bubble__text--typing" : ""
            }`}
            style={{
              background: `linear-gradient(180deg, ${color.rangeStart} 0%, ${color.rangeEnd} 85%)`,
            }}
          >
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {typing ? <Typing /> : message.reactContent}
          </div>
        </div>
      </div>
    </div>
  );
}

Text.propTypes = {
  color: PropTypes.shape({
    // TODO: Any way to use the hex code validator here?
    rangeStart: PropTypes.string,
    rangeEnd: PropTypes.string,
  }),
  disableTyping: PropTypes.bool,
  message: PropTypes.shape({
    reactContent: PropTypes.arrayOf(PropTypes.element).isRequired,
    sender: PropTypes.instanceOf(Persona).isRequired,
    duration: PropTypes.func,
    avatarDescription: PropTypes.bool,
  }).isRequired,
  cb: PropTypes.func,
  scrollToBottom: PropTypes.func,
  shouldAutoScroll: PropTypes.bool,
};

Text.defaultProps = {
  color: {
    rangeStart: "#232232",
    rangeEnd: "#232232",
  },
  disableTyping: false,
  cb: () => {},
  scrollToBottom: () => {},
  shouldAutoScroll: true,
};

export default Text;

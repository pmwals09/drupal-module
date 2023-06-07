import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSpeech } from "../../container/SpeechContext.jsx";
import "./ChatInput.scss";
import { useFocusContext } from "../../container/FocusContext.jsx";
import { mapTtsAbbreviations } from "../../models/chat.js";

function ChatInput({ submitCb, fastOptions, scrollToBottom }) {
  const { speak, cancel } = useSpeech();
  const { setFocusable, unsetFocusable, getFocusable } = useFocusContext();

  /*
   * Ensure that first tab brings a user to a fast option and not the topics
   * nav
   */
  useEffect(() => {
    document.addEventListener("keydown", handleTabbing);
    return () => {
      unsetFocusable("fastOption");
      document.removeEventListener("keydown", handleTabbing);
    };

    function handleTabbing(e) {
      if (e.key === "Tab" && e.target.tagName.toLowerCase() === "body") {
        if (e.shiftKey) {
          // Added/handled in topicConfig.js
          const topicsNav = getFocusable("topicsNav");
          if (topicsNav) {
            e.preventDefault();
            topicsNav.focus();
          }
        } else {
          const fastOption = getFocusable("fastOption");
          if (fastOption) {
            e.preventDefault();
            fastOption.focus();
          }
        }
      }
    }
  }, []);

  function handleSubmit(option) {
    submitCb(option.letter);
  }

  return (
    <section className="chat__topic__input">
      {fastOptions ? (
        <div className="input__fast-options">
          {fastOptions.map((option, i) => (
            <button
              key={`fast-option-${option.letter}-${option.text}`}
              type="button"
              className="input__fast-options__option"
              onClick={() => handleSubmit(option)}
              onFocus={() => {
                cancel();
                speak({
                  text: `${option.letter}. button: ${mapTtsAbbreviations(
                    option.text
                  )}`,
                  shouldAllowRepeat: false,
                });
              }}
              ref={(n) => {
                if (n) {
                  if (i === 0) {
                    setFocusable({ key: "fastOption", element: n });
                  }
                  scrollToBottom();
                }
              }}
            >
              {option.letter}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

ChatInput.propTypes = {
  submitCb: PropTypes.func,
  fastOptions: PropTypes.arrayOf(
    PropTypes.exact({ letter: PropTypes.string, text: PropTypes.string })
  ),
  scrollToBottom: PropTypes.func,
};

ChatInput.defaultProps = {
  submitCb: () => {},
  fastOptions: [],
  scrollToBottom: () => {},
};
export default ChatInput;

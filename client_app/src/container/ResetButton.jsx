import { useState } from "react";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { useSearchParams } from "react-router-dom";
import { resetAppState } from "../redux/ducks/shared.js";
import { useSpeech } from "./SpeechContext.jsx";
import "./ResetButton.scss";
import { useCustomNavigate } from "./useCustomNavigate.js";

function ResetButton() {
  const dispatch = useDispatch();
  const customNavigate = useCustomNavigate();
  const [params] = useSearchParams();
  const [showReset, setShowReset] = useState(false);
  const { speak, cancel } = useSpeech();
  const isKiosk = params.get("kiosk");

  function handleYes() {
    const omit = ["isUsingKeypad"];
    if (!isKiosk) {
      omit.push("hasGoneThroughOnboarding");
    }
    dispatch(resetAppState({ omit }));
    if (isKiosk) {
      customNavigate("/chatbot/attract");
    } else {
      customNavigate("/chatbot/chat");
    }
    handleCloseModal();
  }

  function handleNo() {
    handleCloseModal();
  }

  function handleClick() {
    setShowReset(true);
  }

  function handleCloseModal() {
    setShowReset(false);
  }

  return (
    <>
      <button
        type="button"
        className="app-header__start-over"
        onClick={() => handleClick()}
        onFocus={() => {
          cancel();
          speak({ text: "Start Over" });
        }}
      >
        Start Over
      </button>
      <Modal
        isOpen={showReset}
        onRequestClose={() => handleCloseModal()}
        appElement={document.querySelector("#react-app")}
        onAfterOpen={() => {
          cancel();
          speak({ text: "Are you sure you'd like to reset the experience?" });
        }}
        onAfterClose={() => cancel()}
        className="start-over-confirm__modal"
        overlayClassName="start-over-confirm__modal-overlay"
      >
        <div className="start-over-confirm__content">
          <p className="start-over-confirm__prompt">
            Are you sure you&apos;d like to reset the chat?
          </p>
          <div className="start-over-confirm__actions">
            <button
              type="button"
              className="start-over-confirm__actions__action"
              onClick={() => handleYes()}
              onFocus={() => {
                cancel();
                speak({ text: "Yes button" });
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="start-over-confirm__actions__action"
              onClick={() => handleNo()}
              onFocus={() => {
                cancel();
                speak({ text: "No button" });
              }}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ResetButton;

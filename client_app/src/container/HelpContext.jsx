import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import Modal from "react-modal";
import { useLocation, matchPath } from "react-router-dom";
import { useSpeech } from "./SpeechContext.jsx";
import helpImg from "../assets/images/NavPad-HelpScreen-Vertical.jpg";
import audioDescription, {
  helpDescription,
} from "../services/audioDescription.js";

const HelpContext = createContext();

export function useHelpContext() {
  const ctx = useContext(HelpContext);
  if (ctx === undefined) {
    throw new Error("useHelpContext must be inside a HelpContext Provider.");
  }
  return ctx;
}

// eslint-disable-next-line react/prop-types
export function HelpContextProvider({ children }) {
  const location = useLocation();
  const { speak, cancel, newRepeatContext, clearRepeatContext } = useSpeech();
  const [showHelp, setShowHelp] = useState(false);

  function handleOpenModal() {
    if (!location.pathname.includes("dataviz")) {
      cancel();
      newRepeatContext();
      speak({ text: helpDescription });
      setShowHelp(true);
    }
  }

  function handleCloseModal() {
    cancel();
    clearRepeatContext();
    // read the page-level description of where you are
    let text = "";
    const descriptionKey = Object.keys(audioDescription).find((k) =>
      matchPath(k, location.pathname)
    );

    if (descriptionKey) {
      const textObj = audioDescription[descriptionKey];
      if (
        typeof textObj === "object" &&
        "page" in textObj &&
        "text" in textObj.page &&
        "kiosk" in textObj.page
      ) {
        text = `${textObj.page.text} ${textObj.page.kiosk}`;
      } else {
        text = textObj;
      }
      speak({ text });
    }
    setShowHelp(false);
  }

  const toggleModal = useCallback(() => {
    if (showHelp) {
      handleCloseModal();
    } else {
      handleOpenModal();
    }
  }, [showHelp]);

  const value = useMemo(
    () => ({
      handleOpenModal,
      handleCloseModal,
      toggleModal,
      showHelp,
    }),
    [showHelp, location]
  );

  return (
    <HelpContext.Provider value={value}>
      {children}
      <Modal
        isOpen={showHelp}
        onRequestClose={() => handleCloseModal()}
        className="help__content"
        overlayClassName="help__overlay"
        appElement={document.querySelector("#react-app")}
        onAfterOpen={() => speak({ text: helpDescription })}
      >
        <img
          src={helpImg}
          alt={helpDescription}
          style={{ height: "100%", width: "auto", maxWidth: "unset" }}
        />
      </Modal>
    </HelpContext.Provider>
  );
}

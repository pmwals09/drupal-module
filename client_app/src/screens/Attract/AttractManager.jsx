import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useGlobalEvent } from "../../container/GlobalEventContext.jsx";
import { useCustomNavigate } from "../../container/useCustomNavigate.js";
import { resetAppState } from "../../redux/ducks/shared.js";
import { useSpeech } from "../../container/SpeechContext.jsx";

const TIMEOUT = window.reactAppSettings?.timeout || 1000 * 60 * 3;
const AttractContext = createContext();

export function useAttractContext() {
  const ctx = useContext(AttractContext);
  if (ctx === undefined) {
    throw new Error("useAttractContext must be used inside AttractManager");
  }
  return ctx;
}

// TODO: I'm not sure we should be passing the handleCloseModal argument in -
// it's fine for now, but ideally we can globalize the modal handling since it's
// just the one spot, but if that changes we should either create another
// context or hook, or we should use Redux to manage that state
// eslint-disable-next-line react/prop-types
function AttractManager({ children, handleCloseModal }) {
  const { userEvents } = useGlobalEvent();
  const navigate = useCustomNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const isKiosk = params.get("kiosk");
  const { cancel } = useSpeech();

  const timeout = useRef(null);

  useEffect(() => {
    if (shouldUseTimeout()) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(handleTimeout, TIMEOUT);
    }

    userEvents.forEach((eventName) => {
      document.addEventListener(eventName, handleEventHeartbeat);
      if (shouldUseTimeout()) {
        document.addEventListener(eventName, handleEventTimeout);
      }
    });

    function handleEventHeartbeat() {
      window.postMessage("heartbeat", "*");
      resetTimer();
    }

    function handleEventTimeout() {
      resetTimer();
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      userEvents.forEach((eventName) => {
        document.removeEventListener(eventName, handleEventTimeout);
        document.removeEventListener(eventName, handleEventHeartbeat);
      });
    };
  }, [location]);

  function shouldUseTimeout() {
    const isValidRoute = !["/chatbot/dataviz", "/chatbot/attract"].includes(
      location.pathname
    );
    return isValidRoute && isKiosk;
  }

  function resetTimer() {
    if (shouldUseTimeout()) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(handleTimeout, TIMEOUT);
    }
  }

  function handleTimeout() {
    window.postMessage("reset", "*");
    handleCloseModal();
    const omit = ["isUsingKeypad"];
    if (!isKiosk) {
      omit.push("hasGoneThroughOnboarding");
    }
    dispatch(resetAppState({ omit }));
    cancel();
    navigate("/chatbot/attract");
  }

  function triggerHeartbeat() {
    window.postMessage("heartbeat", "*");
    resetTimer();
  }

  const value = useMemo(
    () => ({
      resetTimer,
      triggerHeartbeat,
    }),
    [location]
  );

  return (
    <AttractContext.Provider value={value}>{children}</AttractContext.Provider>
  );
}

AttractManager.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
};

export default AttractManager;

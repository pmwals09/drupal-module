import ReactGA from "react-ga4";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { useSpeech } from "./SpeechContext.jsx";
import PageLayout from "./PageLayout.jsx";
import Topics from "../screens/Topics/Topics.jsx";
import ChatTopic from "../screens/Chat/ChatTopic.jsx";
import DataViz from "../screens/DataViz/DataViz.jsx";
import Attract from "../screens/Attract/Attract.jsx";
import AttractManager from "../screens/Attract/AttractManager.jsx";
import "./App.scss";
import { setIsUsingKeypad } from "../redux/ducks/settingsSlice.js";
import { useHelpContext } from "./HelpContext.jsx";
import { useCustomNavigate } from "./useCustomNavigate.js";

function App() {
  const dispatch = useDispatch();
  const { cancel, updateSettings, getSettings, repeat } = useSpeech();
  const { hasGoneThroughOnboarding, isUsingKeypad } = useSelector(
    (state) => state.settings
  );
  const location = useLocation();
  const navigate = useCustomNavigate();
  const [params] = useSearchParams();
  const isKiosk = params.get("kiosk");
  const { handleOpenModal, handleCloseModal, showHelp, toggleModal } =
    useHelpContext();

  function handleToggleKeypad(e) {
    console.log("handleToggleKeypad", e);
    if (e.key === "+") {
      console.log("jack in");
      dispatch(setIsUsingKeypad(true));
      handleOpenModal();
    }

    if (e.key === "-") {
      console.log("jack out");
      dispatch(setIsUsingKeypad(false));
      cancel();
      handleCloseModal();
    }
  }

  function handleIsUsingKeypad(e) {
    console.log("handleIsUsingKeypad", e);
    if (e.key === "Enter" && showHelp) {
      handleCloseModal();
    }

    if (e.key === ".") {
      console.log("rate up");
      e.preventDefault();
      updateSettings({ rate: Math.min(getSettings().rate + 0.1, 2) });
    }

    if (e.key === ",") {
      console.log("rate down");
      e.preventDefault();
      updateSettings({ rate: Math.max(getSettings().rate - 0.1, 0.5) });
    }

    if (e.key === "?") {
      console.log("toggle modal");
      e.preventDefault();
      toggleModal();
    }

    if (e.key === "'") {
      console.log("repeat last");
      e.preventDefault();
      repeat();
    }

    if (["Up", "ArrowUp"].includes(e.key)) {
      console.log("volume up");
      e.preventDefault();
      updateSettings({ volume: Math.min(getSettings().volume + 0.1, 2) });
    }

    if (["Down", "ArrowDown"].includes(e.key)) {
      console.log("volume down");
      e.preventDefault();
      updateSettings({ volume: Math.max(getSettings().volume - 0.1, 0) });
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleToggleKeypad);
    if (isUsingKeypad) {
      document.addEventListener("keydown", handleIsUsingKeypad);
    }

    return () => {
      document.removeEventListener("keydown", handleToggleKeypad);
      document.removeEventListener("keydown", handleIsUsingKeypad);
    };
  }, [isUsingKeypad, showHelp]);

  useEffect(() => {
    if (location.pathname.includes("dataviz")) return;
    const originalPath = location.pathname;
    const shouldRedirectKiosk =
      isKiosk &&
      !["onboarding", "attract", "dataviz"].some((p) =>
        originalPath.toLowerCase().includes(p)
      ) &&
      !hasGoneThroughOnboarding;
    const shouldRedirectPhone =
      !isKiosk &&
      !hasGoneThroughOnboarding &&
      !originalPath.includes("onboarding");
    if (shouldRedirectKiosk) {
      navigate("/chatbot/chat/onboarding", { kiosk: true });
    } else if (shouldRedirectPhone) {
      navigate(`/chatbot/chat/onboarding?target=${originalPath}`);
    }
  }, [location]);

  useEffect(() => {
    const gaString = location.pathname + location.search;
    const reportObj = {
      hitType: "pageview",
      page: gaString,
    };
    console.log(reportObj);
    ReactGA.send(reportObj);
  }, [location]);

  return (
    <AttractManager handleCloseModal={() => handleCloseModal()}>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Topics />} />
        </Route>
        <Route path="/chatbot" element={<PageLayout />}>
          <Route path="chat" element={<Topics />} />
          <Route path="chat/:topic" element={<ChatTopic />} />
        </Route>
        <Route path="/chatbot/attract" element={<Attract />} />
        <Route path="/chatbot/dataviz" element={<DataViz />} />
      </Routes>
    </AttractManager>
  );
}

export default App;

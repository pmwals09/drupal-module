import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./DataViz.scss";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useSpeech } from "../../container/SpeechContext.jsx";
import * as service from "./DataViz.service.js";
import "./Chart.scss";
import { Question } from "../../models/question.js";
import { TopicConfig } from "../../models/topicConfig.js";
import TitleSlide from "./TitleSlide.jsx";
import ChartSlide from "./ChartSlide.jsx";
import { useCustomNavigate } from "../../container/useCustomNavigate.js";

const defaultItemIdx = 0;

function DataViz({ forTest = false }) {
  const { isUsingKeypad } = useSelector((state) => state.settings);
  const slides = useRef(service.buildSlideCfgs({ forTest }));
  const [itemIdx, setItemIdx] = useState(defaultItemIdx);
  const { cancel } = useSpeech();
  const cfg = slides.current[itemIdx];
  const chartInterval = isUsingKeypad ? cfg.dataViz.timeout : 15 * 1000;
  const intervalDuration =
    cfg instanceof TopicConfig ? 10 * 1000 : chartInterval;
  const [runTimer, setRunTimer] = useState(true);
  const [params] = useSearchParams();
  const navigate = useCustomNavigate();
  const animationResetFnRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const { announceDataViz, cancelAnnounceDataViz, announceIsSpeaking } =
    service.useAnnounceDataViz();

  useEffect(() => {
    document.addEventListener("keydown", handleDataVizKeys);
    return () => document.removeEventListener("keydown", handleDataVizKeys);

    function handleDataVizKeys(e) {
      let newSlides = null;
      switch (e.key) {
        case "ArrowRight":
          // increment slide
          animationResetFnRef.current().then(() => {
            cancel();
            setItemIdx((prev) => (prev + 1) % slides.current.length);
          });
          break;
        case "ArrowLeft":
          cancel();
          // decrement slide
          animationResetFnRef.current().then(() => {
            cancel();
            setItemIdx((prev) =>
              prev - 1 < 0
                ? (slides.current.length - 1) % slides.current.length
                : (prev - 1) % slides.current.length
            );
          });
          break;
        case "p":
        case "P":
          // pause
          setRunTimer((prev) => !prev);
          break;
        case "t":
        case "T":
          // title slides only
          newSlides = service
            .buildSlideCfgs({ forTest })
            .filter((ea) => ea instanceof TopicConfig);
          slides.current = newSlides;
          setItemIdx((prev) => Math.min(prev, newSlides.length - 1));
          break;
        case "c":
        case "C":
          // chart slides only
          newSlides = service
            .buildSlideCfgs({ forTest })
            .filter((ea) => ea instanceof Question);
          slides.current = newSlides;
          setItemIdx((prev) => Math.min(prev, newSlides.length - 1));
          break;
        case "a":
        case "A":
          // all slides
          newSlides = service.buildSlideCfgs({ forTest });
          slides.current = newSlides;
          setItemIdx((prev) => Math.min(prev, newSlides.length - 1));
          break;
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    const t = setInterval(handleUpdateSlide, intervalDuration);
    return () => clearInterval(t);
  }, [itemIdx]);

  useEffect(() => {
    if (!params.get("kiosk")) {
      navigate("/chatbot/dataviz", { kiosk: true });
    }
  }, []);

  useEffect(() => {
    if (isUsingKeypad) {
      // TODO: Placeholder for after beta - this announcement will sometimes need
      // to span transitions, which is problematic since we call `cancel()`
      // everywhere
      // announceDataViz()
    }
  }, [isUsingKeypad]);

  function handleUpdateSlide() {
    if (runTimer) {
      animationResetFnRef.current().then(() => {
        // if(!announceIsSpeaking.current) {
        cancel();
        // }
        setItemIdx((prev) => (prev + 1) % slides.current.length);
      });
    }
  }

  return (
    <div
      className={`dataviz__container${
        cfg.dataViz?.orientation
          ? ` dataviz__container--${cfg.dataViz.orientation}`
          : ""
      }${
        process.env.NODE_ENV === "development" ? " dataviz__container--dev" : ""
      }`}
    >
      {(() => {
        if (cfg instanceof Question) {
          return (
            <ChartSlide
              topicConfig={cfg}
              animationFnRef={animationResetFnRef}
              announceIsSpeaking={announceIsSpeaking}
            />
          );
        }
        if (cfg instanceof TopicConfig) {
          return (
            <TitleSlide
              topicConfig={cfg}
              animationFnRef={animationResetFnRef}
            />
          );
        }
        return null;
      })()}
    </div>
  );
}

DataViz.propTypes = {
  forTest: PropTypes.bool.isRequired,
};

export default DataViz;

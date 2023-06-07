import { useState, useEffect, useCallback, useRef } from "react";
import { useSpring, useSpringRef } from "@react-spring/web";
import { useSpeech } from "../../container/SpeechContext.jsx";
import { chartableQuestions } from "../Chat/questions.js";
import { topicsConfig } from "../Topics/Topics.config.js";
import * as config from "./Chart.config.js";
import { Question } from "../../models/question.js";
import { api } from "../../services/apiService.js";
import { dataVizDescription } from "../../services/audioDescription.js";
import { mapTtsAbbreviations } from "../../models/chat.js";

export function useAnimations(cfg) {
  const timings = {};
  timings.blob = {
    duration: 1000,
    delay: 0,
  };
  timings.speaker = {
    duration: 500,
    get delay() {
      return timings.blob.duration - this.duration;
    },
  };
  timings.displayQuestion = {
    duration: 500,
    delay: timings.blob.duration,
  };
  timings.chart = {
    duration: 500,
    delay: 1500,
  };
  timings.outro = {
    duration: 1000,
  };

  const {
    styles: displayQuestionStyles,
    ref: displayQuestionSpringRef,
    reset: displayQuestionReset,
  } = useDisplayQuestionAnimation(timings);
  const {
    styles: speakerStyles,
    ref: speakerSpringRef,
    reset: speakerReset,
  } = useSpeakerAnimation(timings);
  const {
    styles: blobStyles,
    ref: blobSpringRef,
    reset: blobReset,
  } = useBlobAnimation({ timings, cfg });
  const {
    ref: chartSpringRef,
    styles: chartStyles,
    reset: chartReset,
  } = useChartAnimation(timings);

  function intro() {
    blobSpringRef.start();
    speakerSpringRef.start();
    displayQuestionSpringRef.start();
    chartSpringRef.start();
  }

  async function reset() {
    const promises = [
      blobReset(),
      speakerReset(),
      displayQuestionReset(),
      chartReset(),
    ];
    return Promise.all(promises);
  }

  return {
    styles: {
      displayQuestion: displayQuestionStyles,
      speaker: speakerStyles,
      blob: blobStyles,
      chart: chartStyles,
    },
    springRefs: {
      displayQuestionSpringRef,
      speakerSpringRef,
      blobSpringRef,
      chartSpringRef,
    },
    intro,
    reset,
  };
}

function useDisplayQuestionAnimation(timings) {
  const ref = useSpringRef();
  const styles = useSpring({
    ref,
    reset: true,
    opacity: 1,
    from: { opacity: 0 },
    delay: timings.displayQuestion.delay,
    config: { duration: timings.displayQuestion.duration },
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ opacity: 0, onRest: () => resolve() });
    });
  }
  return { ref, styles, reset };
}

function useSpeakerAnimation(timings) {
  const ref = useSpringRef();
  const styles = useSpring({
    ref,
    reset: true,
    y: 0,
    opacity: 1,
    from: { y: 2000, opacity: 0 },
    delay: timings.speaker.delay,
    config: {
      duration: timings.speaker.duration,
    },
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ y: 2000, opacity: 0, onRest: () => resolve() });
    });
  }
  return { ref, styles, reset };
}

function useBlobAnimation({ cfg, timings }) {
  const originalX =
    cfg.dataViz?.images.persona.orientation === "left" ? "-100%" : "100%";
  const ref = useSpringRef();
  const styles = useSpring({
    ref,
    reset: true,
    x: "0%",
    opacity: 1,
    from: { x: originalX, opacity: 0 },
    config: {
      duration: timings.blob.duration,
    },
    delay: timings.blob.delay,
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ x: originalX, opacity: 0, onRest: () => resolve() });
    });
  }

  return { ref, styles, reset };
}

function useChartAnimation(timings) {
  const ref = useSpringRef();
  const styles = useSpring({
    ref,
    reset: true,
    opacity: 1,
    from: { opacity: 0 },
    config: {
      duration: timings.chart.duration,
    },
    delay: timings.chart.delay,
  });

  function reset() {
    return new Promise((resolve) => {
      ref.start({ opacity: 0, onRest: () => resolve() });
    });
  }
  return { ref, styles, reset };
}

export function buildSlideCfgs({ forTest }) {
  const slideCfgsMap = {};
  chartableQuestions.forEach((q) => {
    if (q.topicId in slideCfgsMap) {
      slideCfgsMap[q.topicId].push(q);
    } else {
      slideCfgsMap[q.topicId] = [q];
    }
  });

  const slideCfgs = [];
  topicsConfig.forEach((topic) => {
    if (!forTest) {
      slideCfgs.push(topic);
    }
    slideCfgs.push(...slideCfgsMap[topic.key]);
  });

  return slideCfgs;
}

export function formatData({ jsonData, itemConfig }) {
  const {
    id: questionId,
    options,
    dataViz: { chartType },
  } = itemConfig;
  const relevant = jsonData.filter((ea) => ea.question === questionId);
  const responsesMap = relevant.reduce(
    (out, ea) => ({
      ...out,
      [ea.answer]:
        ea.answer in out ? out[ea.answer] + ea.answer_count : ea.answer_count,
    }),
    {}
  );
  const valuesSort =
    chartType === "sentiment" ? () => -1 : (a, b) => b.val - a.val;
  const valueArray = Object.keys(responsesMap)
    .sort((a, b) => (a < b ? -1 : 1))
    .map((k, i) => ({
      val: responsesMap[k],
      name: options[i].shortText,
    }))
    // NOTE: Sorting twice so we can pair up the response with its text,
    // then again to sort by value
    // TODO: We shouldn't sort the range/sentiment responses
    .sort(valuesSort)
    .map((ea, i) => {
      const res = {
        ...ea,
        custom: config.labelPositions[i],
      };
      // NOTE: I would prefer to handle this in Chart.config.js in
      // labelPositions, but this response, the only one that has a word that
      // is too long, can be in any position, so we would need to make every
      // label 500 wide, which breaks some other styling/spacing.
      if (ea.name === "Occasionally") {
        res.custom = { ...res.custom, style: { minWidth: 500 } };
      }
      return res;
    });
  return valueArray;
}

export function useChartData({ itemConfig, intro }) {
  const [chartData, setChartData] = useState([]);

  const getChartData = useCallback(async () => {
    try {
      const json = await api.getResponses();
      setChartData(formatData({ jsonData: json, itemConfig }));
      intro();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e.message);
      setChartData([]);
    }
  }, [itemConfig]);

  useEffect(() => {
    getChartData();
  }, [getChartData]);

  return { chartData };
}

export const noResponseCopy =
  "We haven't received any responses to this question yet - you can be our first! Be sure to check out the rest of the exhibit!";

export function useAnnounceSlide({ chartData, itemConfig }) {
  const { speak, supported, cancel } = useSpeech();
  useEffect(() => {
    const {
      dataViz: {
        chartType,
        images: {
          persona: {
            orientation,
            persona: { name },
          },
        },
        customText,
      },
    } = itemConfig;
    const [, chartSide] =
      orientation === "left" ? ["left", "right"] : ["right", "left"];
    if (itemConfig instanceof Question) {
      const totalResponses = chartData.reduce((total, ea) => total + ea.val, 0);
      const { shortText, id } = itemConfig;
      speak({ text: `${name} asks: "${shortText}"` });
      if (chartData.length) {
        speak({
          text: `A ${
            chartType === "pie" ? "pie" : "bar"
          } chart shows the results${
            chartType !== "sentiment"
              ? " in order from most selected to least selected"
              : ""
          }.`,
        });
        chartData.forEach((datum) => {
          let option = mapTtsAbbreviations(datum.name).slice(0, -1);
          if (id === "resources.poundsCo2") {
            option += " of its carbon footprint";
          }
          speak({
            text: `${option}: ${Math.round(
              (datum.val / totalResponses) * 100
            )}%`,
          });
        });
      } else {
        speak({
          text: `On the ${chartSide} side of the screen is white text:`,
        });
        noResponseCopy
          .split(/\.|!/)
          .forEach((sentence) => speak({ text: sentence }));
      }
    } else {
      const { subTitle } = itemConfig;
      speak({
        text: "A screen introduces the next topic.",
      });
      speak({
        text: customText || subTitle,
      });
    }

    return () => cancel();
  }, [supported, itemConfig, chartData]);
}

export function useAnnounceDataViz() {
  const { speak, supported, cancel } = useSpeech();
  const isAnnouncing = useRef(false);

  function announceDataViz() {
    if (supported) {
      isAnnouncing.current = true;
      speak({
        text: dataVizDescription,
        onEnd: () => {
          isAnnouncing.current = false;
        },
      });
    }
  }

  return {
    announceDataViz,
    cancelAnnounceDataViz: cancel,
    announceIsSpeaking: isAnnouncing,
  };
}

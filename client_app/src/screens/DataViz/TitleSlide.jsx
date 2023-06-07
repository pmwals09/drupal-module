import { useEffect } from "react";
import "./TitleSlide.scss";
import { animated } from "@react-spring/web";
import { useAnimations } from "./TitleSlide.service.js";
import { useAnnounceSlide } from "./DataViz.service.js";

/* eslint-disable react/prop-types */
function TitleSlide({ topicConfig, animationFnRef }) {
  const {
    subTitle,
    dataViz: {
      images: {
        texture: { src: textureSrc },
        persona: { src: personaSrc, orientation },
      },
      customText,
    },
  } = topicConfig;
  const { styles, intro, reset } = useAnimations();
  useAnnounceSlide({ itemConfig: topicConfig });

  useEffect(() => {
    intro();
    // eslint-disable-next-line no-param-reassign
    animationFnRef.current = reset;
  }, []);
  return (
    <div
      className={`dataviz__title-slide__container dataviz__title-slide__container--${orientation}`}
    >
      <animated.img
        src={textureSrc}
        alt=""
        className={`dataviz__title-slide__bg dataviz__title-slide__bg--${orientation}`}
        style={styles.texture}
      />
      <animated.img
        src={personaSrc}
        alt=""
        className={`dataviz__title-slide__persona dataviz__title-slide__persona--${orientation}`}
        style={styles.persona}
      />
      <animated.h1
        className={`dataviz__title-slide__copy dataviz__title-slide__copy--${orientation}`}
        style={styles.text}
      >
        {customText || subTitle}
      </animated.h1>
    </div>
  );
}

export default TitleSlide;

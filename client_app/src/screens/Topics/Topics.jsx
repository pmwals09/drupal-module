import { useEffect } from "react";
import { useBeforeUnload, useSearchParams } from "react-router-dom";
import { useSpeech } from "../../container/SpeechContext.jsx";
import Topic from "./Topic.jsx";
import TitleBlock from "./TitleBlock.jsx";
import { topicsConfig } from "./Topics.config.js";
import audioDescription from "../../services/audioDescription.js";

function Topics() {
  const { speak, cancel, supported } = useSpeech();
  const [params] = useSearchParams();
  const isKiosk = params.get("kiosk");

  useEffect(() => {
    let { text } = audioDescription["/"].page;
    if (isKiosk) {
      text += ` ${audioDescription["/"].page.kiosk}`;
    }
    speak({ text });
  }, [supported]);

  useBeforeUnload(() => {
    cancel();
  });

  return topicsConfig.map((topicConfig) => {
    const { color, mainTitle, subTitle, key, icon } = topicConfig;
    const Icon = icon;

    return (
      <Topic
        color={color.primary}
        key={`${mainTitle}`}
        topic={key}
        onFocus={() => {
          cancel();
          speak({ text: `${subTitle}, link` });
        }}
      >
        <TitleBlock textColor={color.text}>
          <TitleBlock.MainTitle>{subTitle}</TitleBlock.MainTitle>
        </TitleBlock>
        <Icon className="topic__icon" aria-hidden />
      </Topic>
    );
  });
}

export default Topics;

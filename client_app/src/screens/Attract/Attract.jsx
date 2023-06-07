import "./Attract.scss";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { animated, useSpring, useSpringRef } from "@react-spring/web";
import { useSpeech } from "../../container/SpeechContext.jsx";
import attractVideo from "../../assets/video/chatbot-attract.mp4";
import audioDescription from "../../services/audioDescription.js";
import cultureQRCode from "../../assets/images/s.si.edu_culturaluses.png";
import influenceQRCode from "../../assets/images/s.si.edu_influence.png";
import resourcesQRCode from "../../assets/images/s.si.edu_resources.png";

// eslint-disable-next-line react/prop-types
function Attract() {
  const [params] = useSearchParams();
  const { speak, cancel, updateSettings } = useSpeech();
  const { hasGoneThroughOnboarding } = useSelector((state) => state.settings);
  const springRef = useSpringRef();
  const [styles, api] = useSpring(
    () => ({
      ref: springRef,
      reset: true,
      opacity: 1,
      from: { opacity: 0 },
      delay: 1000 * 20,
      config: { duration: 1000 },
    }),
    []
  );

  const basePath = getBasePath(params);
  const target = params.get("target");

  function getBasePath(pathParams) {
    const isKiosk = pathParams.get("kiosk");
    if (isKiosk || !hasGoneThroughOnboarding) {
      return "/chatbot/chat/onboarding";
    }
    return pathParams.get("target") || "/chatbot/chat";
  }

  useEffect(() => {
    updateSettings({ volume: 1, rate: 1 });
    speak({
      text: audioDescription["/chatbot/attract"],
    });
  }, []);

  let qrCode = resourcesQRCode;
  if (target?.includes("influence")) {
    qrCode = influenceQRCode;
  } else if (target?.includes("culture")) {
    qrCode = cultureQRCode;
  }

  return (
    <Link
      to={`${basePath}?kiosk=true${target ? `&target=${target}` : ""}`}
      className="attract"
      ref={(n) => (n ? n.focus() : null)}
      onClick={() => cancel()}
    >
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        autoPlay
        className="attract__video"
        onPlay={() => {
          api.start({
            opacity: 1,
            from: { opacity: 0 },
            delay: 20000,
            config: { duration: 1000 },
          });
          setTimeout(() => {
            api.start({
              opacity: 0,
              from: { opacity: 1 },
              config: { duration: 1000 },
            });
          }, 29000);
        }}
        onEnded={(e) => {
          e.target.play();
        }}
      >
        <source src={attractVideo} type="video/mp4" />
      </video>
      <animated.img
        src={qrCode}
        alt=""
        className="attract__qr"
        style={styles}
      />
    </Link>
  );
}

export default Attract;

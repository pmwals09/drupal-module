import { useEffect } from "react";
import PropTypes from "prop-types";
import { animated } from "@react-spring/web";
import { Question } from "../../models/question.js";
import BgTexture from "../../assets/images/background-texture.png";
import Blob from "./Blob.jsx";
import Speaker from "./Speaker.jsx";
import DisplayQuestion from "./DisplayQuestion.jsx";
import * as service from "./DataViz.service.js";
import Chart from "./Chart.jsx";

function ChartSlide({ topicConfig, animationFnRef }) {
  const {
    dataViz: {
      images: {
        persona: { orientation, src },
      },
    },
    topic: {
      color: { primary },
    },
  } = topicConfig;

  const { styles, intro, reset } = service.useAnimations(topicConfig);
  const { chartData } = service.useChartData({
    itemConfig: topicConfig,
    intro,
  });

  service.useAnnounceSlide({ chartData, itemConfig: topicConfig });

  useEffect(() => {
    intro();
    // eslint-disable-next-line no-param-reassign
    animationFnRef.current = reset;
  }, []);

  return (
    <div>
      <img
        src={BgTexture}
        className={`dataviz__bg${
          orientation ? ` dataviz__bg--${orientation}` : ""
        }`}
        alt=""
      />
      <Blob color={primary} orientation={orientation} springs={styles.blob} />
      <Speaker
        persona={topicConfig.persona}
        imageSrc={src}
        orientation={orientation}
        springs={styles.speaker}
      />
      <DisplayQuestion
        question={topicConfig}
        orientation={orientation}
        springs={styles.displayQuestion}
      />
      {chartData.length ? (
        <Chart
          chartId={topicConfig.id}
          chartType={topicConfig.dataViz.chartType}
          data={chartData}
          orientation={orientation}
          springs={styles.chart}
        />
      ) : (
        <animated.p
          className={`dataviz__no-data-copy${
            orientation ? ` dataviz__no-data-copy--${orientation}` : ""
          }`}
          style={styles.chart}
        >
          {service.noResponseCopy}
        </animated.p>
      )}
    </div>
  );
}

ChartSlide.propTypes = {
  topicConfig: PropTypes.instanceOf(Question).isRequired,
  animationFnRef: PropTypes.shape({ current: PropTypes.func }).isRequired,
};

export default ChartSlide;

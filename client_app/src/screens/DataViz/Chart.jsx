import PropTypes from "prop-types";
import { animated } from "@react-spring/web";
import "./Chart.scss";
// import * as service from "./Chart.service.js";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsAccessibility from "highcharts/modules/accessibility";
import * as config from "./Chart.config.js";

highchartsAccessibility(Highcharts);

// eslint-disable-next-line react/prop-types
function Chart({ chartId, chartType, data, orientation, springs }) {
  const configChartType = chartType === "pie" ? "pie" : "bar";
  const options = config.options[configChartType](data);
  return (
    <animated.div
      className={`dataviz__chart${
        orientation ? ` dataviz__chart--${orientation}` : ""
      }`}
      style={springs}
    >
      <HighchartsReact
        id={chartId}
        key={chartId}
        highcharts={Highcharts}
        options={options}
        allowChartUpdate
      />
    </animated.div>
  );
}

Chart.propTypes = {
  chartType: PropTypes.oneOf(["pie", "bar"]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      val: PropTypes.number.isRequired,
      name: PropTypes.number.isRequired,
      custom: PropTypes.shape({
        labelPosition: PropTypes.exact({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
        connectorSide: PropTypes.oneOf(["right", "left"]),
      }),
    })
  ).isRequired,
  orientation: PropTypes.oneOf(["left", "right"]),
};

Chart.defaultProps = {
  chartType: "bar",
  orientation: "left",
};

export default Chart;

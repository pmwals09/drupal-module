/* eslint-disable*/
import { renderToStaticMarkup } from "react-dom/server";
import produce from "immer";
import PieLabel from "./PieLabel.jsx";

export const colors = [
  "#DC248F",
  "#FFD745",
  "#1EA0FC",
  "#1DE699",
  "#FF8336",
  "#7E09E2",
  "#9A88A9",
  "#5B8C1E",
];

const sharedConfig = {
  chart: {
    backgroundColor: "none",
  },
  title: {
    text: "",
  },
};

let prevConnectors = [];

const pieConfig = {
  chart: {
    ...sharedConfig.chart,
    type: "pie",
    height: "100%",
    margin: [2 * 80, 2 * 270, 2 * 220, 2 * 180],
    spacing: [0, 0, 0, 0],
    events: {
      render() {
        const chart = this;
        if (prevConnectors.length) {
          prevConnectors.forEach((connector) => {
            connector.remove();
          });
          prevConnectors = [];
        }
        chart.series.forEach((series) => {
          sortDataPoints(series.points).forEach((point) => {
            // Label adjustment
            const customData = point.custom || {};
            if (customData.labelPosition) {
              let newLabelX = customData.labelPosition.x;
              let newLabelY = customData.labelPosition.y;

              if (point.index == 1) {
                let prevPoint = series.points[point.index - 1];
                if (prevPoint) {
                  let prevY = prevPoint.connector.pathArray[0][2];
                  if (prevY > newLabelY + 2 * 96) {
                    newLabelY = prevY + 2 * 50 - 2 * 96;
                  }
                }
              }

              // Connector adjustment
              const connector = point.connector;
              if (connector && connector.visibility !== "hidden") {
                // Cleanup old paths
                const parent = connector.parentGroup.element;
                const angleId = point.name + "-custom-connector";
                parent.childNodes.forEach((child) => {
                  if (child.id === angleId) child.remove();
                });

                // Position will end in top right corner of label by default
                const startX = connector.pathArray[0][1] + 2 * 10; // Adding circle radius
                const startY = connector.pathArray[0][2];
                const padding = 2 * 10;
                const labelWidth = point.dataLabel.bBox.width;
                let endX =
                  newLabelX +
                  (customData.connectorSide === "left"
                    ? -padding
                    : labelWidth + padding);
                let endY = newLabelY + 2 * 96;
                let midX =
                  endX +
                  (customData.connectorSide === "left" ? 2 * -25 : 2 * 25);

                // Create new path to dataLabel position
                const newpath = document.createElementNS(
                  "http://www.w3.org/2000/svg",
                  "path"
                );
                newpath.setAttributeNS(null, "id", angleId);
                newpath.setAttributeNS(
                  null,
                  "class",
                  "highcharts-data-label-connector"
                );
                newpath.setAttributeNS(
                  null,
                  "d",
                  "M " +
                    startX +
                    " " +
                    startY +
                    " " +
                    midX +
                    " " +
                    endY +
                    " " +
                    endX +
                    " " +
                    endY
                );
                newpath.setAttributeNS(null, "stroke", "white");
                newpath.setAttributeNS(
                  null,
                  "stroke-width",
                  connector["stroke-width"]
                );
                newpath.setAttributeNS(null, "stroke-linejoin", "round");
                newpath.setAttributeNS(null, "fill", "none");
                newpath.setAttributeNS(null, "opacity", connector.opacity);
                parent.appendChild(newpath);
                prevConnectors.push(newpath);
              }

              point.dataLabel.translate(newLabelX, newLabelY);
            }
          });
        });
      },
      /* eslint-enable */
    },
  },
  caption: {
    text: "",
  },
  title: {
    ...sharedConfig.title,
  },
  plotOptions: {
    series: {
      states: {
        inactive: {
          enabled: false,
        },
      },
    },
    pie: {
      innerSize: "40%",
      size: "100%",
      borderColor: "#232232",
      startAngle: 0,
      dataLabels: {
        enabled: true,
        useHTML: true,
        connectorColor: "white",
        // connectorPadding: 0,

        // Define custom connector shape
        // eslint-disable-next-line no-unused-vars, object-shorthand
        connectorShape(labelPosition, connectorPosition, options) {
          const centerX = this.series.center[0];
          const centerY = this.series.center[1];
          const endX =
            (centerX - connectorPosition.touchingSliceAt.x) * 0.15 +
            connectorPosition.touchingSliceAt.x;
          const endY =
            (centerY - connectorPosition.touchingSliceAt.y) * 0.15 +
            connectorPosition.touchingSliceAt.y;

          const finalRadius = 10;
          const thickness = 4;
          const count = 3;
          const finalPath = [];
          for (let index = 0; index < count; index += 1) {
            const thisRadius = finalRadius - index * thickness;
            const element = [
              "M",
              endX - thisRadius,
              endY,
              "a",
              thisRadius,
              thisRadius,
              0,
              1,
              1,
              thisRadius * 2,
              0,
              "a",
              thisRadius,
              thisRadius,
              0,
              1,
              1,
              -(thisRadius * 2),
              0,
              // "M", endX, endY, 'L', labelPosition.x, labelPosition.y, // line
            ];
            finalPath.push(element);
          }
          return finalPath;
        },
        /* eslint-enable */
        connectorWidth: 2 * 4,
        // distance: "35%",
        padding: 0,
        position: "left",
        style: {
          color: "white",
          textOverflow: "clip",
        },
        verticalAlign: "center",
      },
    },
  },
  credits: {
    enabled: false,
  },
};

const marginRight = 225;
const barConfig = {
  chart: {
    ...sharedConfig.chart,
    type: "bar",
    height: "85%", // 800,
    events: {
      render() {
        const total = this.series[0].yData.reduce((out, ea) => out + ea);
        this.series[0].data.forEach((datum) => {
          const val = `${Math.round((datum.y / total) * 100)}%`;
          if (datum.dataLabel?.element?.children?.[0]) {
            // eslint-disable-next-line no-param-reassign
            datum.dataLabel.element.children[0].textContent = val;
          }
        });
      },
    },
    marginRight,
  },
  plotOptions: {
    series: {
      borderColor: "none",
      dataLabels: {
        enabled: true,
        inside: false,
        align: "right",
        crop: false,
        overflow: "allow",
        padding: -marginRight,
      },
    },
  },
  legend: {
    enabled: false,
  },
  xAxis: {
    type: "category",
    className: "dataviz__xaxis",
    lineColor: "none",
    labels: {
      style: {
        color: "#fff",
        fontSize: "5rem",
        textOverflow: "none",
        lineHeight: "90",
        fontWeight: "bold",
      },
    },
    offset: 40,
  },
  yAxis: {
    visible: false,
  },
  title: {
    ...sharedConfig.title,
  },
  credits: {
    enabled: false,
  },
};

export const options = {
  pie: getPieOptions,
  bar: getBarOptions,
};

function getPieOptions(data) {
  return produce(pieConfig, (draft) => {
    // eslint-disable-next-line no-param-reassign
    draft.series = [
      {
        type: "pie",
        data: data.map(({ name, val, custom }, i) => ({
          name,
          borderWidth: 15,
          y: val,
          custom,
          color: colors[i],
          dataLabels: {
            formatter() {
              // eslint-disable-next-line react/no-this-in-sfc, react/jsx-filename-extension
              return renderToStaticMarkup(
                // eslint-disable-next-line react/jsx-filename-extension
                <PieLabel
                  text={this.point.name}
                  percentVal={Math.round(this.point.percentage)}
                  customStyle={this.point.custom?.style}
                />
              );
            },
          },
        })),
      },
    ];
  });
}

function getBarOptions(data) {
  return produce(barConfig, (draft) => {
    const total = data.reduce((out, ea) => out + ea.val, 0);
    // eslint-disable-next-line no-param-reassign
    draft.series = [
      {
        type: "bar",
        data: data.map(({ name, val }, i) => ({
          name,
          y: val,
          color: colors[i],
          dataLabels: {
            formatter() {
              return `${Math.round((val / total) * 100)}%`;
            },
            position: "right",
            x: 2 * 10,
            style: {
              color: "#fff",
              fontFamily: "brandon-grotesque",
              fontWeight: "bold",
              fontSize: "6.5rem",
              lineHeight: 1,
            },
          },
        })),
      },
    ];
  });
}

export const labelPositions = [
  {
    labelPosition: { x: 2 * 570, y: 2 * 100 },
    connectorSide: "left",
  },
  {
    labelPosition: { x: 2 * 350, y: 2 * 620 },
    connectorSide: "left",
  },
  {
    labelPosition: { x: 2 * -180, y: 2 * 427 },
    connectorSide: "right",
  },
  {
    labelPosition: { x: -170, y: 2 * -100 },
    connectorSide: "right",
  },
];

function sortDataPoints(dataPoints) {
  dataPoints.sort((a, b) => b.val - a.val);
  return dataPoints;
}

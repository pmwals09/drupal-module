/* eslint-disable max-classes-per-file */
class InvalidOptionError extends Error {}

const VALID_CHART_TYPES = ["pie", "bar", "sentiment"];

export class DataVizConfig {
  /* @param {Object} args - object for named arguments
   * @param {VALID_CHART_TYPES | null} args.chartType - type of chart to display
   * @param {string | { persona: string, texture: string | null }} args.images - string to the image file to use
   */
  constructor({ chartType = null, images, timeout = null }) {
    if (chartType) {
      if (VALID_CHART_TYPES.includes(chartType)) {
        this._chartType = chartType;
      } else {
        throw new InvalidOptionError(
          `Chart type must be one of: ${VALID_CHART_TYPES.join(", ")}`
        );
      }
    } else {
      this._chartType = null;
    }

    this._images = images;
    if (!images.texture) {
      this._images.texture = null;
    }

    this._timeout = timeout;
  }

  get validChartTypes() {
    return this._validChartTypes;
  }

  get chartType() {
    return this._chartType;
  }

  set chartType(newChartType) {
    if (VALID_CHART_TYPES.includes(newChartType)) {
      this._chartType = newChartType;
    } else {
      throw new InvalidOptionError(
        `Chart type must be one of: ${VALID_CHART_TYPES.join(", ")}`
      );
    }
  }

  get images() {
    return this._images;
  }

  set images(newImages) {
    this._images = newImages;
  }

  get timeout() {
    return this._timeout;
  }

  set timeout(newTimeout) {
    this._timeout = newTimeout;
  }
}

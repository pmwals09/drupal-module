import PropTypes from "prop-types";
import "./PieLabel.scss";

function PieLabel({ percentVal, text, customStyle = {} }) {
  return (
    <div className="dataviz__chart__label--pie" style={customStyle}>
      <p className="label__element label__element--number">{percentVal}%</p>
      <hr className="label__element label__element--separator" />
      <p className="label__element label__element--text">{text}</p>
    </div>
  );
}

PieLabel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  percentVal(props, propName, componentName) {
    if (propName in props) {
      const val = Number(props[propName]);
      if (!Number.isNaN(val)) {
        if (val >= 0 && val <= 100) {
          return null;
        }
        return new Error(`${propName} must be between 0 and 100`);
      }
      return new Error(`${propName} must be a valid number`);
    }
    return new Error(`${propName} is required in ${componentName}`);
  },
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line
  customStyle(props, propName, componentName) {
    return null;
  },
};

export default PieLabel;

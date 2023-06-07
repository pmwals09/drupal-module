import PropTypes from "prop-types";
import { animated } from "@react-spring/web";
import { hexColor } from "../../services/propTypeValidators.js";
import BlobBgTexture from "../../assets/images/blob-background-texture.png";
import "./Blob.scss";

// eslint-disable-next-line react/prop-types
function Blob({ color, orientation, springs }) {
  return (
    <animated.div
      className={`dataviz__blob${
        process.env.NODE_ENV === "development" ? " dataviz__blob--dev" : ""
      }${orientation ? ` dataviz__blob--${orientation}` : ""}`}
      data-testid="blob"
      style={{ ...springs, backgroundColor: color }}
    >
      <img
        src={BlobBgTexture}
        className={`dataviz__blob__bg${
          orientation ? ` dataviz__blob__bg--${orientation}` : ""
        }`}
        alt=""
      />
    </animated.div>
  );
}

Blob.propTypes = {
  color(props, propName, componentName) {
    return hexColor(props, propName, componentName);
  },
  orientation: PropTypes.oneOf(["left", "right"]),
};

Blob.defaultProps = {
  color: "#232232",
  orientation: "left",
};

export default Blob;

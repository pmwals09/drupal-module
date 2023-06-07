import { animated } from "@react-spring/web";
import PropTypes from "prop-types";
import { Persona } from "../../models/persona.js";
import "./Speaker.scss";

// eslint-disable-next-line react/prop-types
function Speaker({ persona, imageSrc, orientation, springs }) {
  return (
    <animated.div
      className={`dataviz__speaker${
        orientation ? ` dataviz__speaker--${orientation} ` : ""
      }`}
      style={springs}
    >
      <img
        src={imageSrc}
        className="dataviz__speaker__img"
        alt={`${persona.name} asking a question`}
        id={JSON.stringify(persona)}
      />
    </animated.div>
  );
}

Speaker.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  persona: PropTypes.instanceOf(Persona).isRequired,
  orientation: PropTypes.oneOf(["left", "right"]),
};

Speaker.defaultProps = {
  orientation: "left",
};

export default Speaker;

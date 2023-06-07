import PropTypes from "prop-types";
import { Persona } from "../../models/persona.js";

function Avatar({ name, className, style }) {
  const persona = new Persona({ name });
  return (
    <img
      src={persona.avatar}
      alt={`${persona.name} avatar`}
      className={className}
      style={style}
    />
  );
}

Avatar.propTypes = {
  name: PropTypes.oneOf(["Mateo", "Butterbean", "Toni", "Nadia"]).isRequired,
  className: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Avatar.defaultProps = {
  className: "",
  style: {},
};

export default Avatar;

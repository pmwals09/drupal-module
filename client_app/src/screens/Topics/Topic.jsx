import React from "react";
import PropTypes from "prop-types";
import "./Topic.scss";
import { Link, useSearchParams } from "react-router-dom";
import { hexColor } from "../../services/propTypeValidators.js";

function Topic({ children, color, topic, disabled, onFocus }) {
  const [params] = useSearchParams();

  const newChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { ...child.props, color })
  );

  return (
    <Link
      to={`/chatbot/chat/${topic}${
        params.toString() ? `?${params.toString()}` : ""
      }`}
      className={`topic-container${
        disabled ? " topic-container--disabled" : ""
      }`}
      style={{ backgroundColor: color }}
      tabIndex={disabled ? -1 : 0}
      onFocus={() => onFocus()}
    >
      {newChildren}
    </Link>
  );
}

Topic.propTypes = {
  children: PropTypes.node,
  color(props, propName, componentName) {
    return hexColor(props, propName, componentName);
  },
  topic: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func.isRequired,
};

Topic.defaultProps = {
  children: [],
  color: "#000",
  disabled: false,
};

export default Topic;

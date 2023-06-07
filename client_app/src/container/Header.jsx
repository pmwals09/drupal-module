import { forwardRef } from "react";
import PropTypes from "prop-types";
import { hexColor } from "../services/propTypeValidators.js";
import "./Header.scss";

const Header = forwardRef(({ color, children, nav }, ref) => {
  const RightNav = nav.right;
  const LeftNav = nav.left;
  return (
    <header
      className="app-header"
      id="chatbot-header"
      style={{ backgroundColor: color }}
      ref={ref}
    >
      {typeof nav.left === "function" ? <LeftNav /> : nav.left}
      <span className="app-header__title">{children}</span>
      {typeof nav.right === "function" ? <RightNav /> : nav.right}
    </header>
  );
});

Header.propTypes = {
  color(props, propName, componentName) {
    return hexColor(props, propName, componentName);
  },
  children: PropTypes.node.isRequired,
  nav: PropTypes.exact({
    left: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    right: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }).isRequired,
};

Header.defaultProps = {
  color: "#232232",
};

export default Header;

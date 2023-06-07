import PropTypes from "prop-types";
import { hexColor } from "../../services/propTypeValidators.js";
import "./TitleBlock.scss";

function TitleBlock({ children, textColor }) {
  return (
    <div className="title-block" style={{ color: textColor }}>
      {children}
    </div>
  );
}

TitleBlock.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/require-default-props
  textColor(props, propName, componentName) {
    return hexColor(props, propName, componentName);
  },
};

function MainTitle({ children }) {
  return <h2 className="title-block__main">{children}</h2>;
}

MainTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

TitleBlock.MainTitle = MainTitle;

function SubTitle({ children }) {
  return <h3 className="title-block__sub">{children}</h3>;
}

SubTitle.propTypes = {
  children: PropTypes.string.isRequired,
};

TitleBlock.SubTitle = SubTitle;

export default TitleBlock;

import { animated } from "@react-spring/web";
import PropTypes from "prop-types";
import { Question } from "../../models/question.js";
import "./DisplayQuestion.scss";

// eslint-disable-next-line react/prop-types
function DisplayQuestion({ question, orientation, springs }) {
  return (
    <animated.h1
      className={`dataviz__prompt${
        orientation ? ` dataviz__prompt--${orientation} ` : ""
      }`}
      style={{ ...springs, color: question.topic.color.text }}
    >
      {question.shortText}
    </animated.h1>
  );
}

DisplayQuestion.propTypes = {
  orientation: PropTypes.oneOf(["left", "right"]),
  question: PropTypes.instanceOf(Question).isRequired,
};

DisplayQuestion.defaultProps = {
  orientation: "left",
};
export default DisplayQuestion;

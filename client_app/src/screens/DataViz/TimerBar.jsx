import PropTypes from "prop-types";
import "./TimerBar.scss";

function TimerBar({ updateSlide }) {
  return (
    <div
      className="dataviz__timer-bar"
      onAnimationIteration={() => updateSlide()}
    >
      <div className="dataviz__timer-bar__progress" />
    </div>
  );
}

TimerBar.propTypes = {
  updateSlide: PropTypes.func.isRequired,
};

export default TimerBar;

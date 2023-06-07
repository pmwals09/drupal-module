import PropTypes from "prop-types";
import { ReactComponent as Chevron } from "../../assets/svg/right-chevron.svg";
import "./MoreMessages.scss";

function MoreMessages({ handleClick }) {
  return (
    <button
      type="button"
      className="more-messages__button"
      onClick={() => handleClick()}
    >
      More Messages <Chevron className="more-messages__icon" />
    </button>
  );
}

MoreMessages.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default MoreMessages;

import PropTypes from "prop-types";
import Avatar from "./Avatar.jsx";
import "./AvatarGroup.scss";

function prettyList(nameArray) {
  if (nameArray.length === 1) {
    return nameArray[0];
  }

  return `${nameArray.slice(0, nameArray.length - 1).join(", ")}, and ${
    nameArray[nameArray.length - 1]
  }`;
}

function AvatarGroup({ names }) {
  return (
    <div
      role="img"
      aria-label={`Avatars of those in chat: ${prettyList(names)}`}
      className="avatar-group"
    >
      {names.map((name, i) => {
        const margin = i === names.length - 1 ? 0 : 6;
        return (
          <Avatar
            name={name}
            className="avatar-group__img"
            style={{ marginRight: `-${margin}px` }}
            key={name}
          />
        );
      })}
    </div>
  );
}

AvatarGroup.propTypes = {
  names: PropTypes.arrayOf(
    PropTypes.oneOf(["Mateo", "Butterbean", "Toni", "Nadia"])
  ).isRequired,
};

export default AvatarGroup;

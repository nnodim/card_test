import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

export const SideBarItem = ({ icon, text, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded-lg hover:text-primary ${
        isActive ? "text-primary" : "text-[#6D6D6D]"
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

SideBarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  to: PropTypes.string
};

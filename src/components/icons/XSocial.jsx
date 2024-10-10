import propTypes from "prop-types";
const XSocial = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15.17 2.4751H17.9267L11.9042 9.35843L18.9892 18.7251H13.4417L9.09668 13.0443L4.12505 18.7251H1.36672L7.80839 11.3626L1.01172 2.4751H6.70005L10.6275 7.6676L15.17 2.4751ZM14.2025 17.0751H15.73L5.87005 4.03843H4.23089L14.2025 17.0751Z"
        fill="white"
      />
    </svg>
  );
};

XSocial.propTypes = {
  className: propTypes.string,
};

export default XSocial;

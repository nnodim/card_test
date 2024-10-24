import PropTypes from "prop-types";
export const CheckIcon = ({ className, ...props }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M22.5 11.0799V11.9999C22.4988 14.1563 21.8005 16.2545 20.5093 17.9817C19.2182 19.7088 17.4033 20.9723 15.3354 21.5838C13.2674 22.1952 11.0573 22.1218 9.03447 21.3744C7.01168 20.6271 5.28465 19.246 4.11096 17.4369C2.93727 15.6279 2.37979 13.4879 2.52168 11.3362C2.66356 9.18443 3.49721 7.13619 4.89828 5.49694C6.29935 3.85768 8.19279 2.71525 10.2962 2.24001C12.3996 1.76477 14.6003 1.9822 16.57 2.85986"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 4L12.5 14.01L9.5 11.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

CheckIcon.propTypes = {
  className: PropTypes.string,
};

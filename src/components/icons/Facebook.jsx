import propTypes from "prop-types";
const Facebook = ({ className, ...props }) => {
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
        d="M10.0013 2.26685C5.39893 2.26685 1.66797 5.9978 1.66797 10.6002C1.66797 14.7596 4.71534 18.2071 8.69924 18.8323V13.009H6.58333V10.6002H8.69924V8.76425C8.69924 6.6757 9.94332 5.52205 11.8468 5.52205C12.7586 5.52205 13.7122 5.68481 13.7122 5.68481V7.7356H12.6614C11.6262 7.7356 11.3034 8.37796 11.3034 9.03701V10.6002H13.6146L13.2452 13.009H11.3034V18.8323C15.2872 18.2071 18.3347 14.7596 18.3347 10.6002C18.3347 5.9978 14.6037 2.26685 10.0013 2.26685Z"
        fill="white"
      />
    </svg>
  );
};

Facebook.propTypes = {
  className: propTypes.string,
};

export default Facebook;

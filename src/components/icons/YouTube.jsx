import PropTypes from 'prop-types';

const YouTube = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="13"
      viewBox="0 0 16 13"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M15.191 2.47775C15.0181 1.74363 14.5115 1.1648 13.869 0.967157C12.6952 0.600098 7.99997 0.600098 7.99997 0.600098C7.99997 0.600098 3.30477 0.600098 2.13097 0.953039C1.50082 1.15069 0.981876 1.74363 0.808895 2.47775C0.5 3.81892 0.5 6.6001 0.5 6.6001C0.5 6.6001 0.5 9.39539 0.808895 10.7225C0.981876 11.4566 1.48846 12.0354 2.13097 12.233C3.31712 12.6001 7.99997 12.6001 7.99997 12.6001C7.99997 12.6001 12.6952 12.6001 13.869 12.2472C14.5115 12.0495 15.0181 11.4707 15.191 10.7366C15.4999 9.39539 15.4999 6.61422 15.4999 6.61422C15.4999 6.61422 15.5123 3.81892 15.191 2.47775Z"
        fill="white"
      />
      <path
        d="M10.4103 6.60018L6.50586 4.03076V9.16959L10.4103 6.60018Z"
        fill="#9879EC"
        fillOpacity="0.89"
      />
    </svg>
  );
}

YouTube.propTypes = {
  className: PropTypes.string,
}

export default YouTube
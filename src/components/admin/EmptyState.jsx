import PropTypes from "prop-types";
export const EmptyState = ({icon, heading}) => {
  return (
    <div className="flex flex-col items-center justify-center h-80">
      {icon}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No {heading} found
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm">
        There are no {heading} matching your current filters. Try adjusting your
        search or date range.
      </p>
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.any,
  heading: PropTypes.string
}

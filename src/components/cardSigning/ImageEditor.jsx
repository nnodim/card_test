import useCardSigning from "@/hooks/useCardSigningStore";
import PropTypes from "prop-types";
import DraggableImageEditor from "../DraggableImageEditor";

export const ImageEditor = ({
  maxWidth,
  handleContentSubmission,
  isSigning,
  isUpdating,
}) => {
  

  return (
    
  );
};

ImageEditor.propTypes = {
  maxWidth: PropTypes.number,
  handleContentSubmission: PropTypes.func,
  isSigning: PropTypes.bool,
  isUpdating: PropTypes.bool,
};

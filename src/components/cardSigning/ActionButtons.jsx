import useCardSigning from "@/hooks/useCardSigningStore";
import PropTypes from "prop-types";
import { AddImageButton } from "../AddImageButton";
import { Button } from "../ui/button";

export const ActionButtons = ({ handleNewMessage, emblaApi }) => {
  const {
    current,
    newMessage,
    editorOpen,
    imageEditorOpen,
    newImage,
    setEditingMessage,
    setNewImage,
    setImageEditorOpen,
  } = useCardSigning();

  const handleSlideChange = () => {
    if (current === 1) {
      emblaApi.scrollTo(1, true);
    }
  };

  const handleImageUpload = (imageUrl) => {
    setEditingMessage({
      id: null,
      content: imageUrl,
      rotation: 0,
      x: 50,
      y: 100,
      width: 200,
      height: 200,
      page: current - 1,
      xPercent: (50 / 480) * 100,
      yPercent: (100 / 678) * 100,
    });
    setNewImage(true);
    setImageEditorOpen(true);
    handleSlideChange();
  };

  return (
    <div className="flex lg:flex-col gap-3 lg:gap-6 lg:w-fit justify-center w-full">
      <Button
        disabled={newMessage || editorOpen || newImage || imageEditorOpen}
        onClick={handleNewMessage}
        className="text-white lg:px-10 lg:py-5 rounded-full lg:text-xl/6 h-auto font-normal"
      >
        Add Message
      </Button>

      <AddImageButton
        onImageUpload={handleImageUpload}
        disabled={newMessage || editorOpen || newImage || imageEditorOpen}
      />
    </div>
  );
};

ActionButtons.propTypes = {
  newMessage: PropTypes.bool,
  handleNewMessage: PropTypes.func,
  editorOpen: PropTypes.bool,
  setEditingMessage: PropTypes.func,
  current: PropTypes.number,
  setNewImage: PropTypes.func,
  emblaApi: PropTypes.object,
};

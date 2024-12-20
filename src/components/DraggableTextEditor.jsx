import { cn } from "@/lib/utils";
import { EditorContent } from "@tiptap/react";
import { Expand } from "lucide-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { DeleteModal } from "./DeleteModal";
import { Handle } from "./textEditor/Handle";
import MenuBar from "./textEditor/MenuBar";
import { Button } from "./ui/button";

const DraggableTextEditor = ({
  editorOpen,
  editingMessage,
  setEditingMessage,
  fontSizes,
  editor,
  maxWidth,
  width,
  height,
  onSubmit,
  onDelete,
  onCancel,
  isDisabled,
  handleSubmit,
  bgColor,
  showDelete = true,
}) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const nodeRef = useRef(null);

  // Base dimensions for scaling calculations
  const BASE_WIDTH = 480;
  const BASE_HEIGHT = 678;

  // Calculate scale factor based on current dimensions
  const scaleFactor = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="parent"
      position={{
        x: (editingMessage?.xPercent / 100) * width,
        y: (editingMessage?.yPercent / 100) * height,
      }}
      onStop={(e, data) => {
        const xPercent = (data.x / width) * 100;
        const yPercent = (data.y / height) * 100;
        setEditingMessage({
          ...editingMessage,
          x: (xPercent / 100) * BASE_WIDTH,
          y: (yPercent / 100) * BASE_HEIGHT,
          xPercent,
          yPercent,
        });
      }}
      onDrag={(e) => {
        e.stopPropagation();
      }}
      handle=".draggable"
    >
      <form
        ref={nodeRef}
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "flex w-fit justify-center items-center flex-col gap-4 z-50 absolute top-0 left-0",
          {
            hidden: !editorOpen,
          }
        )}
      >
        <MenuBar editor={editor} bgColor={bgColor} fontSizes={fontSizes} />
        <ResizableBox
          axis="both"
          width={editingMessage?.width * scaleFactor || 230 * scaleFactor}
          height={Infinity}
          id="text-editor"
          className="relative h-full"
          resizeHandles={["e"]}
          minConstraints={[200 * scaleFactor, 50 * scaleFactor]}
          maxConstraints={[maxWidth * scaleFactor, Infinity]}
          onResizeStop={(e, { size: { width } }) => {
            if (editorContainerRef.current) {
              const rect = editorContainerRef.current.getBoundingClientRect();
              const actualWidth = width / scaleFactor;
              setEditingMessage({
                ...editingMessage,
                width: actualWidth,
                height: rect.height / scaleFactor,
              });
            }
          }}
          handle={<Handle />}
        >
          <div
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4CFF] py-3 rounded-sm border border-[#7C4CFF] ring-offset-background leading-none"
            style={{
              textAlign: editor.getAttributes("textStyle").textAlign || "left",
            }}
            ref={editorContainerRef}
          >
            <EditorContent editor={editor} ref={editorRef} />
          </div>
        </ResizableBox>
        <span className="draggable absolute right-0 -bottom-5">
          <Expand className="text-[#008EE6] rotate-45 h-4 w-4 cursor-move" />
        </span>
        <div className="absolute -bottom-[60px] gap-5 flex">
          <Button
            className="bg-[#7C4CFF] text-white py-[10px] hover:bg-[#7C4CFF] px-8"
            type="button"
            disabled={isDisabled}
            onClick={onCancel}
          >
            cancel
          </Button>
          <Button
            className="bg-[#7C4CFF] text-white py-[10px] hover:bg-[#7C4CFF] px-8"
            type="submit"
            disabled={isDisabled}
          >
            save
          </Button>
          {showDelete && (
            <DeleteModal isDisabled={isDisabled} onDelete={onDelete} />
          )}
        </div>
      </form>
    </Draggable>
  );
};

DraggableTextEditor.propTypes = {
  editorOpen: PropTypes.bool,
  editingMessage: PropTypes.object,
  setEditingMessage: PropTypes.func,
  editor: PropTypes.object,
  maxWidth: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onCancel: PropTypes.func,
  isDisabled: PropTypes.bool,
  handleSubmit: PropTypes.func,
  bgColor: PropTypes.bool,
  showDelete: PropTypes.bool,
  fontSizes: PropTypes.array,
};

export default DraggableTextEditor;

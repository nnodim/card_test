import { cn } from "@/lib/utils";
import { Expand } from "lucide-react";
import PropTypes from "prop-types";
import { useRef } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { DeleteModal } from "./DeleteModal";
import { Handle } from "./textEditor/Handle";
import { Button } from "./ui/button";

const DraggableImageEditor = ({
  imageEditorOpen,
  editingMessage,
  setEditingMessage,
  maxWidth,
  width,
  height,
  onCancel,
  onSave,
  onDelete,
  showDelete = true,
  isDisabled,
}) => {
  const nodeRef = useRef(null);
  const editorContainerRef = useRef(null);
  return (
    imageEditorOpen && (
      <Draggable
        nodeRef={nodeRef}
        bounds="parent"
        handle=".draggable"
        position={{
          x: (editingMessage?.xPercent / 100) * width,
          y: (editingMessage?.yPercent / 100) * height,
        }}
        onStop={(e, data) =>
          setEditingMessage({
            ...editingMessage,
            x: data.x,
            y: data.y,
            xPercent: (data.x / width) * 100,
            yPercent: (data.y / height) * 100,
          })
        }
        onDrag={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          ref={nodeRef}
          className={cn(
            "flex w-fit justify-center items-center flex-col gap-4 z-50 absolute top-0 left-0",
            {
              hidden: !imageEditorOpen,
            }
          )}
        >
          <ResizableBox
            axis="both"
            width={editingMessage?.width || Infinity}
            height={Infinity}
            className="relative h-full"
            resizeHandles={["se", "sw", "ne", "nw"]}
            minConstraints={[200, 50]}
            maxConstraints={[maxWidth, Infinity]}
            onResizeStop={() => {
              if (editorContainerRef.current) {
                const rect = editorContainerRef.current.getBoundingClientRect();
                setEditingMessage({
                  ...editingMessage,
                  width: rect.width,
                  height: rect.height,
                });
              }
            }}
            handle={<Handle />}
          >
            <div
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C4CFF] rounded-sm border border-[#7C4CFF] z-[99] ring-offset-background bg-transparent"
              ref={editorContainerRef}
            >
              <img src={editingMessage?.content} alt="" />
            </div>
          </ResizableBox>
          <span className="draggable absolute right-8 -bottom-6">
            <Expand className="text-[#008EE6] rotate-45 h-4 w-4 cursor-move" />
          </span>
          <div className="absolute -bottom-[75px] gap-5 flex items-center">
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
              type="button"
              disabled={isDisabled}
              onClick={onSave}
            >
              save
            </Button>
            {showDelete && (
              <DeleteModal isDisabled={isDisabled} onDelete={onDelete} />
            )}
          </div>
        </div>
      </Draggable>
    )
  );
};

DraggableImageEditor.propTypes = {
  imageEditorOpen: PropTypes.bool,
  editingMessage: PropTypes.object,
  setEditingMessage: PropTypes.func,
  maxWidth: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
  isDisabled: PropTypes.bool,
  showDelete: PropTypes.bool,
  nodeRef: PropTypes.object,
  editorContainerRef: PropTypes.object,
};

export default DraggableImageEditor;

/* eslint-disable react/prop-types */
import useCardSigning from "@/hooks/useCardSigningStore";
import DraggableTextEditor from "../DraggableTextEditor";

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32];

export default function TextEditor({
  editor,
  maxWidth,
  handleSubmit,
  onSubmit,
  width,
  height,
  isUpdating,
  isSigning,
}) {
  const { editingMessage, setEditingMessage, editorOpen, setEditorOpen, setNewMessage } = useCardSigning();

  const handleCancel = () => {
    setEditingMessage(null);
    setEditorOpen(false);
    setNewMessage(false);
  };

  if (!editor) {
    return null;
  }
  return (
    <>
      <DraggableTextEditor
        editorOpen={editorOpen}
        editingMessage={editingMessage}
        setEditingMessage={setEditingMessage}
        editor={editor}
        maxWidth={maxWidth}
        width={width}
        height={height}
        onSubmit={onSubmit}
        onCancel={handleCancel}
        isDisabled={isUpdating || isSigning}
        handleSubmit={handleSubmit}
        bgColor={true}
        fontSizes={fontSizes}
        showDelete={false}
      />
    </>
  );
}

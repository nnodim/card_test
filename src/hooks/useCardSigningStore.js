import { create } from "zustand";

const useCardSigning = create((set) => ({
  current: 0,
  editingMessage: null,
  maxWidth: Infinity,
  editorOpen: false,
  imageEditorOpen: false,
  newMessage: false,
  newImage: false,
  maxPage: 2,
  bgColor: "transparent",
  setCurrent: (current) => set({ current }),
  setEditingMessage: (message) => set({ editingMessage: message }),
  updateEditingMessageHeight: (height) => 
    set((state) => ({
      editingMessage: state.editingMessage 
        ? { ...state.editingMessage, height }
        : null
    })),
  setMaxWidth: (width) => set({ maxWidth: width }),
  setEditorOpen: (open) => set({ editorOpen: open }),
  setImageEditorOpen: (open) => set({ imageEditorOpen: open }),
  setNewMessage: (newMessage) => set({ newMessage }),
  setNewImage: (newImage) => set({ newImage }),
  setMaxPage: (page) => set({ maxPage: page }),
  setBgColor: (color) => set({ bgColor: color }),
}));

export default useCardSigning;
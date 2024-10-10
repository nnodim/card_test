import { useCallback } from "react";

export const useTextCommands = (editor) => {
  return {
    bold: useCallback(
      () => editor.chain().selectAll().focus().toggleBold().run(),
      [editor]
    ),
    italic: useCallback(
      () => editor.chain().selectAll().focus().toggleItalic().run(),
      [editor]
    ),
    strikethrough: useCallback(
      () => editor.chain().selectAll().focus().toggleStrike().run(),
      [editor]
    ),
    fontSize: useCallback(
      (fontSize) =>
        editor.chain().selectAll().focus().setFontSize(fontSize).run(),
      [editor]
    ),
    color: useCallback(
      (event) => editor.chain().selectAll().focus().setColor(event.target.value).run(),
      [editor]
    ),
    backgroundColor: useCallback(
      (event) =>
        editor.chain().selectAll().focus().setBackgroundColor(event.target.value).run(),
      [editor]
    ),
    textJustify: useCallback(
      () => editor.chain().selectAll().focus().setTextAlign("justify").run(),
      [editor]
    ),
    textCenter: useCallback(
      () => editor.chain().selectAll().focus().setTextAlign("center").run(),
      [editor]
    ),
    textLeft: useCallback(
      () => editor.chain().selectAll().focus().setTextAlign("left").run(),
      [editor]
    ),
    textRight: useCallback(
      () => editor.chain().selectAll().focus().setTextAlign("right").run(),
      [editor]
    ),
    fontFamily: useCallback(
      (fontFamily) =>
        editor.chain().selectAll().focus().setFontFamily(fontFamily).run(),
      [editor]
    ),
  };
};

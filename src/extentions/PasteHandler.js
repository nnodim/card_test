import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

export const PasteHandler = Extension.create({
  name: "pasteHandler",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            // Get the current formatting from the editor
            const { editor } = this;
            const fontSize =
              editor.getAttributes("textStyle").fontSize || "16px";
            const fontFamily =
              editor.getAttributes("textStyle").fontFamily || "sans-serif";
            const color = editor.getAttributes("textStyle").color || "#000000";
            const backgroundColor =
              editor.getAttributes("textStyle").backgroundColor ||
              "transparent";
            const textAlign =
              editor.getAttributes("paragraph").textAlign || "left";

            // Extract the pasted content
            const pastedText = event.clipboardData.getData("text/plain");

            // Replace the pasted content with formatted content
            editor
              .chain()
              .focus()
              .insertContent({
                type: "text",
                text: pastedText,
                attrs: {
                  style: `font-size: ${fontSize}; font-family: ${fontFamily}; color: ${color}; background-color: ${backgroundColor}; text-align: ${textAlign};`,
                },
              })
              .run();

            return true; // Prevent the default paste behavior
          },
        },
      }),
    ];
  },
});

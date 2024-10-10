import { Extension } from "@tiptap/core";

const NewLine = Extension.create({
  name: "newLine",

  addKeyboardShortcuts() {
    return {
      Enter: () => {
        const { editor } = this;

        const { to } = editor.state.selection;

        editor
          .chain()
          .focus()
          .insertContent("<br>")
          .setTextSelection(to + 1)
          .run();

        return true;
      },
    };
  },
});

export default NewLine;

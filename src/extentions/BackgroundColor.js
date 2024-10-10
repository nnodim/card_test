import { Extension } from "@tiptap/core";

const BackgroundColor = Extension.create({
  name: "backgroundColor",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }

              return {
                style: `background-color: ${attributes.backgroundColor}`,
              };
            },
            parseHTML: (element) => ({
              backgroundColor: element.style.backgroundColor.replace(
                /["']/g,
                ""
              ),
            }),
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBackgroundColor:
        (backgroundColor) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { backgroundColor }).run();
        },
    };
  },
});

export default BackgroundColor;

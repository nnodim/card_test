import { CustomNode } from "@/components/textEditor/CustomNode";
import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

export const ReactComponent = Node.create({
  name: "reactComponent",

  group: "block",

  content: "inline*",

  defining: true,

  isolating: true,

  addAttributes() {
    return {
      textAlign: {
        default: "left",
        renderHTML: (attributes) => ({
          style: `text-align: ${attributes.textAlign}`,
        }),
        parseHTML: (element) => element.style.textAlign || "left",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "react-component",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "react-component",
      mergeAttributes(HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CustomNode);
  },
});

export default ReactComponent
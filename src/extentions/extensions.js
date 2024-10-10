import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import ReactComponent from "./CustomNode";
import FontSize from "./FontSize";
import BackgroundColor from "./BackgroundColor";
import RestrictSelection from "./RestrictSelection";
import TwoNodeStructure from "./TwoNodeStructure";
import NewLine from "./NewLine";
import { PasteHandler } from "./PasteHandler";

const extensions = [
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "reactComponent") {
        return "Enter your name";
      }
      return "Enter your message";
    },
    emptyNodeClass: "is-node-empty",
    showOnlyCurrent: false,
    includeChildren: true,
  }),
  ReactComponent,
  FontFamily,
  TextStyle,
  TextAlign.configure({
    types: ["reactComponent", "heading", "paragraph"],
  }),
  FontSize,
  Color,
  BackgroundColor,
  StarterKit.configure({
    history: false,
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  RestrictSelection,
  TwoNodeStructure,
  NewLine,
  PasteHandler,
];

export default extensions;

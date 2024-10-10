import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Extension } from "@tiptap/core";

const TwoNodeStructure = Extension.create({
  name: "twoNodeStructure",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("twoNodeStructure"),
        appendTransaction: (transactions, oldState, newState) => {
          // const oldNodeCount = oldState.doc.content.childCount;
          const newNodeCount = newState.doc.content.childCount;

          if (newNodeCount !== 2) {
            const tr = newState.tr;

            // Ensure first node is a paragraph
            if (newState.doc.firstChild?.type.name !== "paragraph") {
              tr.setNodeMarkup(0, newState.schema.nodes.paragraph);
            }

            // Ensure second node is a reactComponent
            if (newState.doc.lastChild?.type.name !== "reactComponent") {
              if (newNodeCount < 2) {
                tr.insert(
                  newState.doc.content.size,
                  newState.schema.nodes.reactComponent.create()
                );
              } else {
                tr.setNodeMarkup(
                  newState.doc.content.size - 1,
                  newState.schema.nodes.reactComponent
                );
              }
            }

            // Remove any additional nodes
            while (tr.doc.content.childCount > 2) {
              tr.delete(
                tr.doc.content.size - tr.doc.lastChild.nodeSize,
                tr.doc.content.size
              );
            }

            return tr;
          }
        },
      }),
    ];
  },
});

export default TwoNodeStructure
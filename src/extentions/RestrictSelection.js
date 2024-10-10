import { Plugin, PluginKey, TextSelection } from "@tiptap/pm/state";
import { Extension } from "@tiptap/core";

const RestrictSelection = Extension.create({
  name: "restrictSelection",

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("restrictSelection"),
        props: {
          handleKeyDown(view, event) {
            const { state, dispatch } = view;
            const { selection, doc } = state;
            if (event.key === "Backspace" || event.key === "Delete") {
              const { empty, from } = selection;

              if (!empty) {
                const $from = state.doc.resolve(from);
                const node = $from.node($from.depth);

                // Prevent deleting the entire node
                if (
                  selection.$from.sameParent(selection.$to) &&
                  selection.$from.parent.type.name === node.type.name
                ) {
                  return false;
                }

                dispatch(
                  state.tr.setSelection(
                    TextSelection.create(state.doc, from, from)
                  )
                );
                return true;
              }
            }

            if ((event.metaKey || event.ctrlKey) && event.key === "a") {
              event.preventDefault();

              let currentNode;
              doc.nodesBetween(selection.from, selection.to, (node, pos) => {
                if (
                  !currentNode &&
                  pos <= selection.from &&
                  pos + node.nodeSize >= selection.to
                ) {
                  currentNode = { node, pos };
                }
              });

              if (currentNode) {
                const { pos, node } = currentNode;
                const nodeStart = pos;
                const nodeEnd = nodeStart + node.nodeSize;

                dispatch(
                  state.tr.setSelection(
                    TextSelection.create(state.doc, nodeStart, nodeEnd - 1)
                  )
                );
                return true;
              }
            }

            if (
              event.shiftKey &&
              [
                "ArrowLeft",
                "ArrowRight",
                "ArrowUp",
                "ArrowDown",
                "Home",
                "End",
              ].includes(event.key)
            ) {
              event.preventDefault();
              const $from = state.doc.resolve(selection.from);
              const $to = state.doc.resolve(selection.to);

              if (!$from.sameParent($to)) {
                let newFrom = selection.from;
                let newTo = selection.to;

                if (["ArrowLeft", "ArrowUp", "Home"].includes(event.key)) {
                  newFrom = $from.before($from.depth);
                } else if (
                  ["ArrowRight", "ArrowDown", "End"].includes(event.key)
                ) {
                  newTo = $to.after($to.depth);
                }

                dispatch(
                  state.tr.setSelection(
                    TextSelection.create(state.doc, newFrom, newTo)
                  )
                );
                return true;
              }
            }
            return false;
          },
          handleTextInput(view, from, to) {
            const { state, dispatch } = view;
            const $from = state.doc.resolve(from);
            const $to = state.doc.resolve(to);

            if (!$from.sameParent($to)) {
              const newSelection = TextSelection.create(state.doc, from, from);
              dispatch(state.tr.setSelection(newSelection));
              return true; // Prevent text input if selection spans multiple nodes
            }

            return false;
          },
        },
      }),
    ];
  },
});

export default RestrictSelection;

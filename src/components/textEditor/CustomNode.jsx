import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import propTypes from "prop-types";

export const CustomNode = ({ node }) => {
  if (!node.attrs) return null;
  return (
    <>
      <NodeViewWrapper>
        <NodeViewContent
          style={{ textAlign: node.attrs.textAlign }}
          className="border-b"
        />
      </NodeViewWrapper>
    </>
  );
};

CustomNode.propTypes = {
  node: propTypes.object.isRequired,
};

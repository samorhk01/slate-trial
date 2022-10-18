import { Node, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export default function BoldParagraph(
  event: React.KeyboardEvent,
  editor: ReactEditor
) {
  if (event.key === "b") {
    event.preventDefault();
    Transforms.setNodes(
      editor,
      { bold: true },
      //split it when the selection is part of the node inside the editor
      {
        match: (node: Node) => Text.isText(node),
        split: true,
      }
    );
  }
}

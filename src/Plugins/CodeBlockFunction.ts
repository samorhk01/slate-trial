import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { CustomEditor } from "./Helpers";

export default function CodeBlockKey(
  event: React.KeyboardEvent,
  editor: ReactEditor
) {
  //match is checking if the current selected node is with type 'code if so turn it back to paragraph

  if (event.key === "`") {
    // Prevent the "`" from being inserted by default.
    event.preventDefault();
    CustomEditor.toggleCodeBlock(editor);
  }
}

import { Node, Text, Transforms } from "slate";
import { ReactEditor } from "slate-react";
import { CustomEditor } from "./Helpers";

export default function BoldParagraph(
  event: React.KeyboardEvent,
  editor: ReactEditor
) {
  if (event.key === "b") {
    event.preventDefault();
    CustomEditor.toggleBoldMark(editor);
  }
}

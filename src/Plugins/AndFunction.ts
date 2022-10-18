import { ReactEditor } from "slate-react";

export default function AndSymbolEncode(
  event: React.KeyboardEvent,
  editor: ReactEditor
) {
  if (event.key === "&") {
    //prevent the & being enter into the slate
    event.preventDefault();
    editor.insertText("and");
  }
}

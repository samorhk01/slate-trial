import { KeyboardEvent } from "react";
import { Editor, Element, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export default function CodeBlockKey(
  event: React.KeyboardEvent,
  editor: ReactEditor
) {
  //match is checking if the current selected node is with type 'code if so turn it back to paragraph
  
  if (event.key === "`" && event.ctrlKey) {
    // Prevent the "`" from being inserted by default.
    event.preventDefault();
    console.log("pressed")
    const [match] = Editor.nodes(editor, {
        match: (node: Node) => {
          return Element.isElement(node) && node.type === "code";
        },
      })
      console.log(match)
    // Otherwise, set the currently selected blocks type to "code".
    Transforms.setNodes(
      editor,
      { type : match? "paragraph" : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  }
}

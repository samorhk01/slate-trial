// Import React dependencies.
import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import { createEditor, BaseEditor, Descendant } from "slate";
// Import the Slate components and React plugin.
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";

//isHotkey import for keydown events
import isHotkey from "is-hotkey";
import AndSymbolEncode from "./Plugins/AndFunction";
import {
  BoldElement,
  CodeElement,
  DefaultElement,
} from "./Plugins/StyleElement";
import CodeBlockKey from "./Plugins/CodeBlockFunction";
import BoldParagraph from "./Plugins/BoldParagraph";

//As for TypeScript, these certian types must be defined to make slate work in typescript
type CustomElement = { type: string; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

function App() {
  //the initial value inside the editor
  const initVal: Descendant[] = [
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ];
  //Constructing the editor
  const [editor] = useState(() => withReact(createEditor()));

  //renderElement declaration -> Use useCallback to remember what to do
  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "paragraph":
        return <DefaultElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <BoldElement {...props} />;
  }, []);

  return (
    <Slate editor={editor} value={initVal}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) return;
          AndSymbolEncode(event, editor);
          CodeBlockKey(event, editor);
          BoldParagraph(event, editor);
        }}
      />
    </Slate>
  );
}
export default App;

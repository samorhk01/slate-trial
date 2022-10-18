// Import React dependencies.
import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import {
  createEditor,
  BaseEditor,
  Descendant,
  Transforms,
  Editor,
} from "slate";
// Import the Slate components and React plugin.
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  RenderElementProps,
} from "slate-react";

//isHotkey import for keydown events
import isHotkey from "is-hotkey";
import AndSymbolEncode from "./Plugins/AndFunction";
import { CodeElement, DefaultElement } from "./Plugins/StyleElement";
import CodeBlockKey from "./Plugins/CodeBlockFunction";

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
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={initVal}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          AndSymbolEncode(event, editor);
          CodeBlockKey(event, editor);
        }}
      />
    </Slate>
  );
}
export default App;

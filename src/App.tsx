// Import React dependencies.
import React, { useCallback, useMemo, useState } from "react";
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

import AndSymbolEncode from "./Plugins/AndFunction";
import { CodeElement, DefaultElement, Leafs } from "./Plugins/StyleElement";
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
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content") as string) || [
        {
          type: "code",
          children: [
            {
              text: "This is my New Statement.",
            },
          ],
        },
        {
          type: "code",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "This is a Paragraph.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "This is ",
            },
            {
              text: "Bold",
              bold: true,
            },
            {
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "This is ",
            },
            {
              text: "Underline",
              underline: true,
              bold: false,
            },
            {
              text: ".",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "code",
          children: [
            {
              text: "This is ",
            },
            {
              text: "ALL.",
              bold: true,
              underline: true,
            },
          ],
        },
      ],
    []
  );
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
    return <Leafs {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        console.log("changes");
        const isAstChange = editor.operations.some((op) => {
          return "set_selection" !== op.type;
        });
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
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

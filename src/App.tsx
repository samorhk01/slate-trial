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
  link?: boolean;
  urlLink?: string;
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
        {
          type: "code",
          children: [
            {
              bold: true,
              underline: true,
              text: "",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              bold: false,
              underline: false,
              text: "Hi i am using ",
            },
            {
              bold: false,
              underline: false,
              text: "Facebook",
              link: true,
              urlLink: "https://facebook.com",
            },
            {
              bold: false,
              underline: false,
              text: " to social network ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              bold: false,
              underline: false,
              text: "Google ",
              link: true,
              url: "https://www.google.com/",
              urlLink: "https://www.google.com/",
            },
            {
              bold: false,
              underline: false,
              link: true,
              url: "https://www.google.com/",
              text: "Twitter ",
              urlLink: "https://twitter.com",
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
        const isAstChange = editor.operations.some((op) => {
          return "set_selection" !== op.type;
        });
        if (isAstChange) {
          console.log("value", value);
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
        style={{ background: "lightGrey" }}
      />
    </Slate>
  );
}
export default App;

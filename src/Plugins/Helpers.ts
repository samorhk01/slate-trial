import { Editor, Element, Node, Text, Transforms } from "slate";

export const CustomEditor = {
  isBoldMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (node: Node) => Text.isText(node) && node.bold === true,
      universal: true,
    });
    return !!match;
  },
  isCodeBlockActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (node: Node) => Element.isElement(node) && node.type === "code",
    });
    return !!match;
  },
  isUnderlineMarkActive(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (node: Node) => Text.isText(node) && node.underline === true,
      universal: true,
    });
    return !!match;
  },
  toggleBoldMark(editor: Editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? false : true },
      {
        match: (node: Node) => Text.isText(node),
        split: true,
      }
    );
  },
  toggleCodeBlock(editor: Editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? "paragraph" : "code" },
      { match: (node: Node) => Editor.isBlock(editor, node) }
    );
  },
  toggleUnderline(editor: Editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? false : true },
      {
        match: (node: Node) => Text.isText(node),
        split: true,
      }
    );
  },
};

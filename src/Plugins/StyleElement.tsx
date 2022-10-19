import { RenderElementProps, RenderLeafProps } from "slate-react";

// Define a React component renderer for our code blocks.
export const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

// Default paragraph element
export const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};
//Leafs for styling
export const Leafs = (props: RenderLeafProps) => {
  if (props.leaf.link === true) {
    return (
      <a
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          textDecoration: props.leaf.underline ? "underline" : "none",
        }}
        href={props.leaf.urlLink}
      >
        {props.children}
      </a>
    );
  } else {
    return (
      <span
        {...props.attributes}
        style={{
          fontWeight: props.leaf.bold ? "bold" : "normal",
          textDecoration: props.leaf.underline ? "underline" : "none",
        }}
      >
        {props.children}
      </span>
    );
  }
};

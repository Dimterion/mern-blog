import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import PropTypes from "prop-types";

const QuillEditor = forwardRef(({ onTextChange, postContent }, ref) => {
  const containerRef = useRef(null);
  const onTextChangeRef = useRef(onTextChange);

  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("article"),
    );
    const quill = new Quill(editorContainer, {
      theme: "snow",
      placeholder: "Write something...",
    });

    ref.current = quill;

    quill.root.innerHTML = postContent || "";

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref, postContent]);

  return <section ref={containerRef}></section>;
});

QuillEditor.displayName = "Editor";

export default QuillEditor;

QuillEditor.propTypes = {
  onTextChange: PropTypes.func,
  postContent: PropTypes.string,
};

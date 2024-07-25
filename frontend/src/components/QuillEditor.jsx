import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import PropTypes from "prop-types";

const QuillEditor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("article"),
      );
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      ref.current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return <section ref={containerRef}></section>;
  },
);

QuillEditor.displayName = "Editor";

export default QuillEditor;

QuillEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.object,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

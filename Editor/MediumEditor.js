import React, { useCallback, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
import DragDrop from 'editorjs-drag-drop';
import edjsHTML from 'editorjs-html';
import parser from 'editorjs-viewer';
import { EDITOR_JS_TOOLS } from "./constants";

const ReactEditorJS = createReactEditorJS();
const edjsParser = parser();

const MediumEditor = (props) => {
  const editorCore = useRef(null);

  const handleInitialize = useCallback(async (instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    const savedData = await editorCore.current.save();
    props.editorjson(savedData, edjsParser(savedData.blocks));
  }, [props]);

  const handleReady = () => {
    const editor = editorCore.current._editorJS;
    new DragDrop(editor);
  };

  return (
    <>
      <ReactEditorJS
        onInitialize={handleInitialize}
        onChange={handleSave}
        tools={EDITOR_JS_TOOLS}
        onReady={handleReady}
        placeholder='Start Writing Your Content'
        defaultValue={props.value}
      />
    </>
  );
}

export default MediumEditor;

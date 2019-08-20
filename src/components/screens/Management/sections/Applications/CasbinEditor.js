import React from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

const editorOptions = {
  lineNumbers: true,
  preserveScrollPosition: true,
  viewportMargin: Infinity,
};

const CasbinEditor = (props) => {
  return (
    <CodeMirror
      className="casbin-code-editor"
      value={props.value}
      onChange={v => props.onChange(v)}
      options={editorOptions}
    />
  );
};

export default CasbinEditor;

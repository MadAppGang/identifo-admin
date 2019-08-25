import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/htmlmixed/htmlmixed';

const defaultEditorValue = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
</body>
</html>`;

const editorOptions = {
  lineNumbers: true,
  theme: 'eclipse',
  mode: 'htmlmixed',
};

const TemplateEditor = () => {
  const [code, setCode] = useState(defaultEditorValue);
  const editorRef = useRef(null);

  const handleEditorClick = () => {
    editorRef.current.focus();
  };

  return (
    /* eslint-disable-next-line */
    <div className="template-editor" onClick={handleEditorClick}>
      <div className="template-editor__numpad-area" />
      <CodeMirror
        ref={editorRef}
        value={code}
        onChange={v => setCode(v)}
        options={editorOptions}
      />
    </div>
  );
};

export default TemplateEditor;

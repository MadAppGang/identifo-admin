import React, { useState, useRef, useEffect } from 'react';
import CodeMirror from 'react-codemirror';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';
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

const TemplateEditor = (props) => {
  const { filename } = props;
  const [code, setCode] = useState(defaultEditorValue);
  const editorRef = useRef(null);

  const handleEditorClick = () => {
    editorRef.current.focus();
  };

  return (
    <>
      <div className="template-editor-header">
        <p className="template-editor__filename">
          <FileIcon className="template-editor__file-icon" />
          {filename}
        </p>

        <button type="button" className="template-editor__upload-code">
          <UploadIcon className="template-editor__upload-icon" />
          Upload source code
        </button>
      </div>

      {/* eslint-disable-next-line */}
      <div className="template-editor" onClick={handleEditorClick}>
        <CodeMirror
          ref={editorRef}
          value={code}
          onChange={v => setCode(v)}
          options={editorOptions}
        />
        <div className="template-editor__numpad-area" />
      </div>
    </>
  );
};

TemplateEditor.defaultProps = {
  filename: 'index.html',
};

export default TemplateEditor;

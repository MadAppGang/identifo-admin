import React, { useState, useRef } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
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

let editor = null;

const TemplateEditor = (props) => {
  const { filename } = props;
  const [code, setCode] = useState(defaultEditorValue);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleEditorClick = () => {
    if (editor) {
      editor.display.input.focus();
    }
  };

  const handleUpload = ({ target }) => {
    setUploading(true);

    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setCode(reader.result);
      setUploading(false);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <div className="template-editor-header">
        <p className="template-editor__filename">
          <FileIcon className="template-editor__file-icon" />
          {filename}
        </p>

        <button
          className="template-editor__upload-code"
          onClick={() => fileInputRef.current.click()}
        >
          <UploadIcon className="template-editor__upload-icon" />
          Upload source code
        </button>

        <input
          type="file"
          onChange={handleUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
      </div>

      {/* eslint-disable-next-line */}
      <div className="template-editor" onClick={handleEditorClick}>
        <CodeMirror
          editorDidMount={v => editor = v}
          value={code}
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

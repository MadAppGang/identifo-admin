import React, { useRef, useState } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Button from '~/components/shared/Button';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';
import SaveIcon from '~/components/icons/SaveIcon';
import 'codemirror/mode/javascript/javascript';

let editor = null;

const defaultContent = `{
  "webcredentials": {
    
  }
}`;

const AppSiteAssociationForm = () => {
  const [content, setContent] = useState(defaultContent);
  const fileInputRef = useRef(null);

  const handleEditorClick = () => {
    if (editor) {
      editor.display.input.focus();
    }
  };

  const handleUpload = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => setContent(reader.result);
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    console.log(content);
  };

  return (
    <div className="app-site-association-form">
      <header className="template-editor-header">
        <p className="template-editor__filename">
          <FileIcon className="template-editor__file-icon" />
          apple-app-site-association
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
      </header>

      {/* eslint-disable-next-line */}
      <div className="template-editor" onClick={handleEditorClick}>
        <CodeMirror
          editorDidMount={v => editor = v}
          value={defaultContent}
          options={{
            lineNumbers: true,
            theme: 'eclipse',
            mode: 'javascript',
          }}
          onChange={(_, data, value) => setContent(value)}
          className="template-editor-inner"
        />
        <div className="template-editor__numpad-area" />
      </div>

      <footer className="template-editor-footer">
        <Button Icon={SaveIcon} onClick={handleSubmit}>
          Upload
        </Button>
      </footer>
    </div>
  );
};

export default AppSiteAssociationForm;

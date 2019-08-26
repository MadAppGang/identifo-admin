import React, { useEffect, useState, useRef } from 'react';
import update from '@madappgang/update-by-path';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LanguageSelector from './LanguageSelector';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

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

const [HTML, CSS, JS] = ['html', 'css', 'js'];
const mode = {
  [HTML]: 'htmlmixed',
  [CSS]: 'css',
  [JS]: 'javascript',
};

let editor = null;

const TemplateEditor = (props) => {
  const { template, onChange } = props;
  const [code, setCode] = useState(defaultEditorValue);
  const fileInputRef = useRef(null);
  const [language, setLanguage] = useState(HTML);

  useEffect(() => {
    setCode(template[language].code);
  }, [template, language]);

  const handleEditorClick = () => {
    if (editor) {
      editor.display.input.focus();
    }
  };

  const handleUpload = ({ target }) => {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => setCode(reader.result);
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (onChange) {
      onChange(update(template, {
        [language]: {
          filename: template[language].filename,
          code,
        },
      }));
    }
  };

  return (
    <>
      <header className="template-editor-header">
        <p className="template-editor__filename">
          <FileIcon className="template-editor__file-icon" />
          {template[language].filename}
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
          value={code}
          options={{
            lineNumbers: true,
            theme: 'eclipse',
            mode: mode[language],
          }}
          className="template-editor-inner"
        />
        <div className="template-editor__numpad-area" />
        <LanguageSelector
          languages={[HTML, CSS, JS]}
          selected={language}
          onChange={setLanguage}
        />
      </div>

      <footer className="template-editor-footer">
        <Button Icon={SaveIcon} onClick={handleSubmit}>
          Submit Template
        </Button>
      </footer>
    </>
  );
};

TemplateEditor.defaultProps = {
  filename: 'index.html',
};

export default TemplateEditor;

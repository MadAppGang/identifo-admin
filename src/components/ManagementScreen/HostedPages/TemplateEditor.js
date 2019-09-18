import React, { useEffect, useState, useRef } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import LanguageSelector from './LanguageSelector';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';

const [HTML, CSS, JS] = ['html', 'css', 'js'];

const mode = {
  [HTML]: 'htmlmixed',
  [CSS]: 'css',
  [JS]: 'javascript',
};

let editor = null;

const composeFilename = (name, ext) => {
  if (!name) {
    return '';
  }

  if (!ext) {
    return name;
  }

  return `${name}.${ext}`;
};

const TemplateEditor = (props) => {
  const { name, extension, source, progress, onChange } = props;
  const [code, setCode] = useState(source || '');
  const [hasChanged, setHasChanged] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!source) return;

    setCode(source);
  }, [source]);

  useEffect(() => {
    if (code !== source) {
      setHasChanged(true);
    }
  }, [code]);

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

  };

  return (
    <>
      <header className="template-editor-header">
        <p className="template-editor__filename">
          <FileIcon className="template-editor__file-icon" />
          {composeFilename(name, extension)}
          {hasChanged && <span className="file-changes-indicator" />}
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
          className="template-editor-inner"
          editorDidMount={v => editor = v}
          value={progress ? '' : code}
          options={{
            lineNumbers: true,
            theme: 'eclipse',
            mode: mode[extension],
          }}
          onBeforeChange={(_, data, value) => setCode(value)}
        />
        <div className="template-editor__numpad-area" />
        <LanguageSelector
          languages={[HTML, CSS, JS]}
          selected={extension}
          onChange={props.onExtensionChange}
        />
      </div>

      <footer className="template-editor-footer">
        <Button
          Icon={progress ? LoadingIcon : SaveIcon}
          onClick={handleSubmit}
          disabled={progress}
        >
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

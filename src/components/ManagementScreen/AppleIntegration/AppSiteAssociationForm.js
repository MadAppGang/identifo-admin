import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { createNotification } from '~/modules/notifications/actions';
import Button from '~/components/shared/Button';
import FileIcon from '~/components/icons/FileIcon.svg';
import UploadIcon from '~/components/icons/UploadIcon.svg';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import useServices from '~/hooks/useServices';
import 'codemirror/mode/javascript/javascript';

let editor = null;

const AppSiteAssociationForm = () => {
  const dispatch = useDispatch();
  const services = useServices();
  const [progress, setProgress] = useState(false);
  const [content, setContent] = useState('{\n\t\n}');
  const fileInputRef = useRef(null);

  const fetchFileContents = async () => {
    setProgress(true);
    try {
      const result = await services.apple.fetchAppSiteAssociationFileContents();
      setContent(result);
    } finally {
      setProgress(false);
    }
  };

  useEffect(() => {
    fetchFileContents();
  }, []);

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

  const handleSubmit = async () => {
    setProgress(true);

    try {
      await services.apple.uploadAppSiteAssociationFileContents(content);

      dispatch(createNotification({
        type: 'success',
        title: 'Success',
        text: 'File has been uploaded.',
      }));
    } catch (_) {
      dispatch(createNotification({
        type: 'failure',
        title: 'Something went wrong',
        text: 'File could not be uploaded.',
      }));
    } finally {
      setProgress(false);
    }
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
          value={content}
          options={{
            lineNumbers: true,
            theme: 'eclipse',
            mode: 'javascript',
            tabSize: 4,
          }}
          onBeforeChange={(_, data, value) => setContent(value)}
          className="template-editor-inner"
        />
        <div className="template-editor__numpad-area" />
      </div>

      <footer className="template-editor-footer">
        <Button
          Icon={progress ? LoadingIcon : SaveIcon}
          onClick={handleSubmit}
          disabled={progress}
        >
          Upload
        </Button>
      </footer>
    </div>
  );
};

export default AppSiteAssociationForm;

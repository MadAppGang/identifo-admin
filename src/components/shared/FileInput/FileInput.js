import React, { useRef, useState } from 'react';
import Input from '~/components/shared/Input';
import FileIcon from '~/components/icons/FileIcon.svg';

const FileInput = ({ onChange, placeholder, ...props }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(props.file || null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <>
      <Input
        placeholder={placeholder}
        value={file ? file.name : ''}
        onChange={() => {}}
        onClick={() => fileInputRef.current.click()}
        style={{ caretColor: 'transparent' }}
        renderButton={() => <FileIcon className="file-input-icon" />}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFile}
      />
    </>
  );
};

FileInput.defaultProps = {
  placeholder: 'Select File',
};

export default FileInput;

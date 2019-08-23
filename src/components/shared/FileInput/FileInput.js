import React, { useRef, useState } from 'react';
import Input from '~/components/shared/Input';
import UploadIcon from '~/components/icons/UploadIcon.svg';

const FileInput = ({ onChange, placeholder, ...props }) => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(props.file || null);

  const handleFile = (event) => {
    setFile(event.target.files[0]);

    if (onChange) {
      onChange(event.target.files[0]);
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
        renderButton={() => <UploadIcon className="file-input-icon" />}
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

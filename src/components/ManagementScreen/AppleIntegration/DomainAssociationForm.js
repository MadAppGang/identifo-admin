import React, { useState } from 'react';
import FileInput from '~/components/shared/FileInput';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';

const AppSiteAssociationForm = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      return;
    }
  };

  return (
    <form className="domain-association-form" onSubmit={handleSubmit}>
      <Field
        label="Developer Domain Association File"
        subtext={file ? file.name : 'No file selected'}
      >
        <FileInput
          disablePathInput
          path="/.well-known/apple-developer-domain-association.txt."
          onFile={setFile}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button type="submit" Icon={SaveIcon}>
          Upload
        </Button>
      </footer>
    </form>
  );
};

export default AppSiteAssociationForm;

import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Input from '~/components/shared/Input';
import FileInput from '~/components/shared/FileInput';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';

const storageTypes = {
  FILE: 'file',
  S3: 's3',
};

const ServerJWTForm = (props) => {
  const { error, loading, onSubmit } = props;

  const settings = props.settings ? props.settings.keyStorage : null;

  const [storageType, setStorageType] = useState(settings ? settings.type : '');
  const [publicKey, setPublicKey] = useState(settings ? settings.publicKey : '');
  const [privateKey, setPrivateKey] = useState(settings ? settings.privateKey : '');
  const [region, setRegion] = useState(settings ? settings.region : '');
  const [bucket, setBucket] = useState(settings ? settings.bucket : '');

  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);

  useEffect(() => {
    if (!settings) return;

    setStorageType(settings.type);
    setPublicKey(settings.publicKey);
    setPrivateKey(settings.privateKey);
    setRegion(settings.region);
    setBucket(settings.bucket || '');
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(props.settings, {
      keyStorage: {
        type: storageType,
        publicKey,
        privateKey,
        region,
        bucket,
      },
      publicKey: publicKeyFile,
      privateKey: privateKeyFile,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Storage Type">
        <Select
          value={storageType}
          disabled={loading}
          onChange={setStorageType}
          placeholder="Select storage type"
        >
          <Option value={storageTypes.FILE} title="File" />
          <Option value={storageTypes.S3} title="S3" />
        </Select>
      </Field>

      {storageType === storageTypes.S3 && (
        <Field label="Region">
          <Input
            value={region}
            autoComplete="off"
            placeholder="Enter s3 region"
            onValue={setRegion}
            disabled={loading}
          />
        </Field>
      )}

      {storageType === storageTypes.S3 && (
        <Field label="Bucket" subtext="Can be overriden by IDENTIFO_JWT_KEYS_BUCKET env variable">
          <Input
            value={bucket}
            autoComplete="off"
            placeholder="Enter s3 bucket"
            onValue={setBucket}
            disabled={loading}
          />
        </Field>
      )}

      <Field label="Public Key">
        <FileInput
          path={publicKey}
          placeholder="Specify path to folder"
          onFile={setPublicKeyFile}
          onPath={setPublicKey}
        />
      </Field>

      <Field label="Private Key">
        <FileInput
          path={privateKey}
          placeholder="Specify path to folder"
          onFile={setPrivateKeyFile}
          onPath={setPrivateKey}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
          disabled={loading}
          error={!loading && !!error}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default ServerJWTForm;

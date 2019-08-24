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

const keyDescription = {
  [storageTypes.FILE]: 'Must be a path to file (e.g, ./jwt/public.pem)',
  [storageTypes.S3]: 'Must be a name of an object in the bucket (e.g, public.pem)',
};

const ServerJWTForm = (props) => {
  const { error, loading, onSubmit } = props;

  const settings = props.settings ? props.settings.keyStorage : null;

  const [storageType, setStorageType] = useState(settings ? settings.type : '');
  const [publicKey, setPublicKey] = useState(settings ? settings.publicKey : '');
  const [privateKey, setPrivateKey] = useState(settings ? settings.privateKey : '');
  const [region, setRegion] = useState(settings ? settings.region : '');

  const [publicKeyFile, setPublicKeyFile] = useState(null);
  const [privateKeyFile, setPrivateKeyFile] = useState(null);

  useEffect(() => {
    if (!settings) return;

    setStorageType(settings.type);
    setPublicKey(settings.publicKey);
    setPrivateKey(settings.privateKey);
    setRegion(settings.region);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(props.settings, {
      keyStorage: {
        type: storageType,
        publicKey,
        privateKey,
        region,
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

      <Field label="Public Key" subtext={keyDescription[storageType]}>
        <Input
          value={publicKey}
          autoComplete="off"
          placeholder="Specify public key"
          onValue={setPublicKey}
          disabled={loading}
        />
      </Field>

      <Field label="Private Key" subtext={keyDescription[storageType]}>
        <Input
          value={privateKey}
          autoComplete="off"
          placeholder="Specify private key"
          onValue={setPrivateKey}
          disabled={loading}
        />
      </Field>

      <Field label="Public Key File">
        <FileInput
          value={publicKeyFile}
          placeholder="Upload file"
          onChange={setPublicKeyFile}
        />
      </Field>

      <Field label="Private Key File">
        <FileInput
          value={privateKeyFile}
          placeholder="Upload file"
          onChange={setPrivateKeyFile}
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

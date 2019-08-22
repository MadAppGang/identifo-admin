import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

const ServerJWTForm = (props) => {
  const { error, loading, settings, onSubmit } = props;

  const [publicKeyPath, setPublicKeyPath] = useState(settings ? settings.publicKeyPath : '');
  const [privateKeyPath, setPrivateKeyPath] = useState(settings ? settings.privateKeyPath : '');

  useEffect(() => {
    if (!settings) return;

    setPublicKeyPath(settings.publicKeyPath);
    setPublicKeyPath(settings.privateKeyPath);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(update(settings, { publicKeyPath, privateKeyPath }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Public Key Path">
        <Input
          value={publicKeyPath}
          autoComplete="off"
          placeholder="Enter path to public key"
          onChange={e => setPublicKeyPath(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field label="Private Key Path">
        <Input
          value={privateKeyPath}
          autoComplete="off"
          placeholder="Enter path to private key"
          onChange={e => setPrivateKeyPath(e.target.value)}
          disabled={loading}
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

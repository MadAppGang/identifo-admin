import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';

const GeneralForm = (props) => {
  const { error, settings, loading, onSubmit } = props;

  const [host, setHost] = useState(settings ? settings.host : '');
  const [issuer, setIssuer] = useState(settings ? settings.issuer : '');

  useEffect(() => {
    if (!settings) return;

    setHost(settings.host);
    setIssuer(settings.issuer);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(update(settings, { host, issuer }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Host">
        <Input
          value={host}
          autoComplete="off"
          placeholder="Enter host url"
          onChange={e => setHost(e.target.value)}
          disabled={loading}
        />
      </Field>

      <Field label="Issuer">
        <Input
          value={issuer}
          autoComplete="off"
          placeholder="Enter issuer url"
          onChange={e => setIssuer(e.target.value)}
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
          Save changes
        </Button>
      </footer>
    </form>
  );
};

export default GeneralForm;

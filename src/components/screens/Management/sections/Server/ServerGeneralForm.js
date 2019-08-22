import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';

const GeneralForm = (props) => {
  const { error, settings, loading, onSubmit } = props;

  const [host, setHost] = useState(settings ? settings.host : '');
  const [issuer, setIssuer] = useState(settings ? settings.issuer : '');
  const [algorithm, setAlgorithm] = useState(settings ? settings.algorithm : '');

  useEffect(() => {
    if (!settings) return;

    setHost(settings.host);
    setIssuer(settings.issuer);
    setAlgorithm(settings.algorithm);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(update(settings, { host, issuer, algorithm }));
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

      <Field label="Algorithm">
        <Select
          value={algorithm}
          disabled={loading}
          onChange={setAlgorithm}
          placeholder="Select Algorithm"
        >
          <Option value="auto" title="Auto" />
          <Option value="rs256" title="rs256" />
          <Option value="es256" title="es256" />
        </Select>
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

export default GeneralForm;

import React, { useState, useEffect } from 'react';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import FormErrorMessage from '~/components/shared/FormErrorMessage';

const CredenrialsEnvForm = (props) => {
  const { error, loading, onSubmit, settings } = props;

  const [loginEnvName, setLoginEnvName] = useState(settings ? settings.loginEnvName : '');
  const [passwordEnvName, setPasswordEnvName] = useState(settings ? settings.passwordEnvName : '');

  useEffect(() => {
    if (!settings) return;

    setLoginEnvName(settings.loginEnvName);
    setPasswordEnvName(settings.passwordEnvName);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ loginEnvName, passwordEnvName });
  };

  return (
    <form className="iap-settings-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Login Env Name">
        <Input
          value={loginEnvName}
          placeholder="Enter login env name"
          onValue={setLoginEnvName}
          disabled={loading}
        />
      </Field>

      <Field label="Password Env Name">
        <Input
          value={passwordEnvName}
          placeholder="Enter password env name"
          onValue={setPasswordEnvName}
          disabled={loading}
        />
      </Field>

      <footer className="iap-settings-form__footer">
        <Button
          type="submit"
          error={!loading && error}
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default CredenrialsEnvForm;

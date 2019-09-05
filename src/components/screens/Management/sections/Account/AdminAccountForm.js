import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import Field from '~/components/shared/Field';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import Toggle from '~/components/shared/Toggle';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { adminAccountFormRules } from './validationRules';
import FormErrorMessage from '~/components/shared/FormErrorMessage';

const validate = Validation.applyRules(adminAccountFormRules);

const AdminAccountForm = (props) => {
  const { onSubmit, error, loading, settings } = props;

  const [email, setEmail] = useState(settings ? settings.email : '');
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validation, setValidation] = useState({
    password: '',
    confirmPassword: '',
    email: '',
  });

  useEffect(() => {
    if (!settings) return;

    setEmail(settings.email);
  }, [settings]);

  const handleInput = (name, value, setValue) => {
    if (name in validation) {
      setValidation(update(validation, { [name]: '' }));
    }

    setValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationReport = validate('all', { email, password, confirmPassword }, {
      omit: editPassword ? [] : ['password', 'confirmPassword'],
    });

    if (Validation.hasError(validationReport)) {
      setValidation(validationReport);
      return;
    }

    onSubmit({ email, password: editPassword ? password : undefined });
  };

  const handleBlur = (name, value) => {
    const validationMessage = validate(name, {
      email,
      password,
      confirmPassword,
      [name]: value,
    });

    setValidation(update(validation, {
      [name]: validationMessage,
    }));
  };

  return (
    <form className="iap-settings-form" onSubmit={handleSubmit}>

      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field
        label="Email"
        subtext={settings ? `Value is stored in ${settings.loginEnvName} env var.` : ''}
      >
        <Input
          value={email}
          placeholder="Enter your email"
          onValue={v => handleInput('email', v, setEmail)}
          onBlur={e => handleBlur('email', e.target.value)}
          errorMessage={validation.email}
          disabled={loading}
        />
      </Field>

      <Toggle
        label="Edit password"
        value={editPassword}
        onChange={() => {
          setEditPassword(!editPassword);
          setValidation(update(validation, {
            password: '',
            confirmPassword: '',
          }));
        }}
      />

      {editPassword && (
        <div className="iap-settings-form__password-fields">
          <Field label="Password">
            <Input
              type="password"
              value={password}
              placeholder="Enter your password"
              onValue={v => handleInput('password', v, setPassword)}
              onBlur={e => handleBlur('password', e.target.value)}
              errorMessage={validation.password}
            />
          </Field>

          <Field label="Confirm Password">
            <Input
              type="password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onValue={v => handleInput('confirmPassword', v, setConfirmPassword)}
              onBlur={e => handleBlur('confirmPassword', e.target.value)}
              errorMessage={validation.confirmPassword}
            />
          </Field>
        </div>
      )}

      <footer className="iap-settings-form__footer">
        <Button
          type="submit"
          error={!loading && !!error}
          disabled={loading || Validation.hasError(validation)}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default AdminAccountForm;

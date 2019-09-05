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
import useForm from '~/hooks/useForm';

const validateValues = (values) => {
  const validate = Validation.applyRules(adminAccountFormRules);
  const omitPasswords = !values.password && !values.confirmPassword;
  const errors = validate('all', values, {
    omit: omitPasswords ? ['password', 'confirmPassword'] : [],
  });

  return Validation.hasError(errors) ? errors : {};
};

const AdminAccountForm = (props) => {
  const { onSubmit, error, loading, settings } = props;

  const [editPassword, setEditPassword] = useState(false);

  const initialValues = {
    email: settings ? settings.email : '',
    password: '',
    confirmPassword: '',
  };

  const form = useForm(initialValues, validateValues, () => {
    onSubmit(update(settings, {
      email: form.values.email,
      password: editPassword ? form.values.password : undefined,
    }));
  });

  const { values, errors, setValues, handleSubmit, handleChange, handleBlur } = form;

  const [validation, setValidation] = useState({
    password: '',
    confirmPassword: '',
    email: '',
  });

  useEffect(() => {
    if (!settings) return;

    setValues({
      email: settings.email || '',
      password: '',
      confirmPassword: '',
    });
  }, [settings]);

  return (
    <form className="iap-settings-form" onSubmit={handleSubmit}>

      {!!error && (
        <FormErrorMessage error={error} />
      )}

      <Field label="Email">
        <Input
          name="email"
          value={values.email}
          placeholder="Enter your email"
          onChange={handleChange}
          onBlur={handleBlur}
          errorMessage={errors.email}
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
              name="password"
              value={values.password}
              placeholder="Enter your password"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.password}
            />
          </Field>

          <Field label="Confirm Password">
            <Input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              placeholder="Confirm your password"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={errors.confirmPassword}
            />
          </Field>
        </div>
      )}

      <footer className="iap-settings-form__footer">
        <Button
          type="submit"
          error={!loading && !!error}
          disabled={loading || Validation.hasError(errors)}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default AdminAccountForm;

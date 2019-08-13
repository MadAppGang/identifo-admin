import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import SaveIcon from '~/components/icons/SaveIcon';
import LoadingIcon from '~/components/icons/LoadingIcon';
import validationRules from './validationRules';
import { Select, Option } from '~/components/shared/Select';
import FormErrorMessage from '~/components/shared/FormErrorMessage';
import Toggle from '~/components/shared/Toggle';
import SecretField from './SecretField';
import MultipleInput from '~/components/shared/MultipleInput';

const extractValue = fn => event => fn(event.target.value);
const validate = Validation.applyRules(validationRules);

const ApplicationGeneralSettingsForm = (props) => {
  const { loading, error, excludeFields, onSubmit, onCancel } = props;
  const application = props.application || {};

  const [redirectUrl, setRedirectUrl] = useState(application.redirect_url || '');
  const [offline, setOffline] = useState(application.offline || false);
  const [type, setType] = useState(application.type || 'web');
  const [name, setName] = useState(application.name || '');
  const [description, setDescription] = useState(application.description || '');
  const [secret, setSecret] = useState(application.secret || '');
  const [allowRegistration, setAllowRegistration] = useState(!application.registration_forbidden);
  const [tfaStatus, setTfaStatus] = useState(application.tfa_status || 'disabled');
  const [active, setActive] = useState(application.active || false);
  const [debugTfaCode, setDebugTfaCode] = useState(application.debug_tfa_code || '');
  const [scopes, setScopes] = useState(application.scopes || []);

  const [validation, setValidation] = useState({
    type: '',
    name: '',
    redirectUrl: '',
  });

  /* update field values after props update */
  useEffect(() => {
    if (!application) return;

    if (application.redirect_url) {
      setRedirectUrl(application.redirect_url);
    }

    if (application.offline) {
      setOffline(application.offline);
    }

    if (application.type) {
      setType(application.type);
    }

    if (application.name) {
      setName(application.name);
    }

    if (application.description) {
      setDescription(application.description);
    }

    if (application.secret) {
      setSecret(application.secret);
    }

    if (application.tfa_status) {
      setTfaStatus(application.tfa_status);
    }

    if (application.active) {
      setActive(application.active);
    }

    if (application.debug_tfa_code) {
      setDebugTfaCode(application.debug_tfa_code);
    }

    if (application.scopes) {
      setScopes(application.scopes);
    }

    setAllowRegistration(!application.registration_forbidden);
  }, [props.application]);

  const isExcluded = field => excludeFields.includes(field);

  const handleInput = (field, value, setValue) => {
    if (field in validation) {
      setValidation(update(validation, { [field]: '' }));
    }
    setValue(value);
  };

  const handleBlur = (field, value) => {
    const validationMessage = validate(field, { [field]: value });

    setValidation(update(validation, {
      [field]: validationMessage,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const report = validate('all', { name, type, redirectUrl });

    if (Validation.hasError(report)) {
      setValidation(report);
      return;
    }

    onSubmit({
      offline,
      type,
      name,
      scopes,
      secret,
      active,
      description,
      tfa_status: tfaStatus,
      redirect_url: redirectUrl,
      registration_forbidden: !allowRegistration,
      debug_tfa_code: debugTfaCode || undefined,
    });
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      {!!error && (
        <FormErrorMessage error={error} />
      )}

      {!isExcluded('name') && (
        <Field label="Name">
          <Input
            value={name}
            autoComplete="off"
            placeholder="Enter name"
            onChange={extractValue(v => handleInput('name', v, setName))}
            onBlur={extractValue(v => handleBlur('name', v))}
            errorMessage={validation.name}
            disabled={loading}
          />
        </Field>
      )}

      {!isExcluded('type') && (
        <Field label="Type">
          <Select
            name="type"
            value={type}
            disabled={loading}
            onChange={setType}
            placeholder="Select Application Type"
            errorMessage={validation.type}
          >
            <Option value="web" title="Single Page Application (Web)" />
            <Option value="android" title="Android Client (Mobile)" />
            <Option value="ios" title="iOS Client (Mobile)" />
          </Select>
        </Field>
      )}

      {!isExcluded('description') && (
        <Field label="Description">
          <Input
            value={description}
            autoComplete="off"
            placeholder="Enter Description"
            onChange={extractValue(v => handleInput('description', v, setDescription))}
            onBlur={extractValue(v => handleBlur('description', v))}
            disabled={loading}
          />
        </Field>
      )}

      {!isExcluded('scopes') && (
        <Field label="Scopes">
          <MultipleInput
            values={scopes}
            placeholder="Hit Enter to add scope"
            onChange={setScopes}
          />
        </Field>
      )}

      {!isExcluded('tfaStatus') && (
        <Field label="2FA Status">
          <Select
            value={tfaStatus}
            disabled={loading}
            onChange={setTfaStatus}
            placeholder="Select TFA Status"
          >
            <Option value="disabled" title="Disabled" />
            <Option value="mandaroty" title="Mandatory" />
            <Option value="optional" title="Optional" />
          </Select>
        </Field>
      )}

      {!isExcluded('secret') && (
        <SecretField value={secret} onChange={setSecret} />
      )}

      {!isExcluded('redirectUrl') && (
        <Field label="Redirect URL">
          <Input
            value={redirectUrl}
            autoComplete="off"
            placeholder="Enter redirect url"
            onChange={extractValue(v => handleInput('redirectUrl', v, setRedirectUrl))}
            onBlur={extractValue(v => handleBlur('redirectUrl', v))}
            errorMessage={validation.redirectUrl}
            disabled={loading}
          />
        </Field>
      )}

      {!isExcluded('debugTfaCode') && (
        <Field label="Debug TFA Code">
          <Input
            value={debugTfaCode}
            autoComplete="off"
            placeholder="Debug TFA Code"
            onChange={extractValue(v => handleInput('debugTfaCode', v, setDebugTfaCode))}
            onBlur={extractValue(v => handleBlur('debugTfaCode', v))}
            disabled={loading}
          />
        </Field>
      )}

      <div>
        {!isExcluded('allowRegistration') && (
          <Toggle
            label="Allow Registration"
            value={!!allowRegistration}
            onChange={setAllowRegistration}
          />
        )}

        {!isExcluded('offline') && (
          <Toggle label="Allow Offline" value={!!offline} onChange={setOffline} />
        )}

        {!isExcluded('active') && (
          <Toggle label="Active" value={!!active} onChange={setActive} />
        )}
      </div>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
          disabled={loading || Validation.hasError(validation)}
          error={!loading && !!error}
        >
          Save changes
        </Button>
        <Button transparent disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
      </footer>
    </form>
  );
};

ApplicationGeneralSettingsForm.defaultProps = {
  excludeFields: [],
};

export default ApplicationGeneralSettingsForm;

import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import * as Validation from '@dprovodnikov/validation';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';
import { smsServiceValidationRules } from './validationRules';

const validate = Validation.applyRules(smsServiceValidationRules);

const SmsServiceSettings = (props) => {
  const { settings, loading, onSubmit } = props;

  const [type, setType] = useState(settings ? settings.type : '');
  const [accountSid, setAccountSid] = useState(settings ? settings.accountSid : '');
  const [authToken, setAuthToken] = useState(settings ? settings.authToken : '');
  const [serviceSid, setServiceSid] = useState(settings ? settings.serviceSid : '');

  const [validation, setValidation] = useState({
    type: '',
    accountSid: '',
    authToken: '',
    serviceSid: '',
  });

  useEffect(() => {
    if (!settings) {
      return;
    }

    setType(settings.type);
    setAccountSid(settings.accountSid);
    setServiceSid(settings.serviceSid);
    setAuthToken(settings.authToken);
  }, [settings]);

  const handleInput = (field, value, setValue) => {
    if (field in validation) {
      setValidation(update(validation, { [field]: '' }));
    }

    setValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const report = validate('all', {
      type, accountSid, authToken, serviceSid,
    }, {
      omit: type === 'mock' ? ['accountSid', 'authToken', 'serviceSid'] : [],
    });

    if (Validation.hasError(report)) {
      setValidation(report);
      return;
    }

    onSubmit({ type, accountSid, authToken, serviceSid });
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="SMS Service">
        <Select
          value={type}
          disabled={loading}
          onChange={v => handleInput('type', v, setType)}
          placeholder="Select Service"
          errorMessage={validation.type}
        >
          <Option value="twilio" title="Twilio" />
          <Option value="mock" title="Mock" />
        </Select>
      </Field>

      {type === 'twilio' && (
        <>
          <Field label="Auth Token">
            <Input
              value={authToken}
              autoComplete="off"
              placeholder="Specify Twilio Auth Token"
              onValue={v => handleInput('authToken', v, setAuthToken)}
              disabled={loading}
              errorMessage={validation.authToken}
            />
          </Field>

          <Field label="Account SID">
            <Input
              value={accountSid}
              autoComplete="off"
              placeholder="Specify Twilio Account SID"
              onValue={v => handleInput('accountSid', v, setAccountSid)}
              disabled={loading}
              errorMessage={validation.accountSid}
            />
          </Field>

          <Field label="Service SID">
            <Input
              value={serviceSid}
              autoComplete="off"
              placeholder="Specify Twilio Service SID"
              onValue={v => handleInput('serviceSid', v, setServiceSid)}
              disabled={loading}
              errorMessage={validation.serviceSid}
            />
          </Field>
        </>
      )}

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
      </footer>
    </form>
  );
};

export default SmsServiceSettings;

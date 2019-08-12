import React, { useState, useEffect } from 'react';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';

const SmsServiceSettings = (props) => {
  const { settings, loading, onCancel, onSubmit } = props;

  const [type, setType] = useState(settings ? settings.type : '');
  const [accountSid, setAccountSid] = useState(settings ? settings.accountSid : '');
  const [authToken, setAuthToken] = useState(settings ? settings.authToken : '');
  const [serviceSid, setServiceSid] = useState(settings ? settings.serviceSid : '');

  useEffect(() => {
    if (!settings) {
      return;
    }

    setType(settings.type);
    setAccountSid(settings.accountSid);
    setServiceSid(settings.serviceSid);
    setAuthToken(settings.authToken);
  }, [settings]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ type, accountSid, authToken, serviceSid });
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="SMS Service">
        <Select
          value={type}
          disabled={loading}
          onChange={setType}
          placeholder="Select Service"
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
              onChange={e => setAuthToken(e.target.value)}
              disabled={loading}
            />
          </Field>

          <Field label="Account SID">
            <Input
              value={accountSid}
              autoComplete="off"
              placeholder="Specify Twilio Account SID"
              onChange={e => setAccountSid(e.target.value)}
              disabled={loading}
            />
          </Field>

          <Field label="Service SID">
            <Input
              value={serviceSid}
              autoComplete="off"
              placeholder="Specify Twilio Service SID"
              onChange={e => setServiceSid(e.target.value)}
              disabled={loading}
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
          Save changes
        </Button>
        <Button transparent disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
      </footer>
    </form>
  );
};

export default SmsServiceSettings;

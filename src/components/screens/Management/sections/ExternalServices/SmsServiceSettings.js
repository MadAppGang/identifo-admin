import React from 'react';
import update from '@madappgang/update-by-path';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import Input from '~/components/shared/Input';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';
import { validateSmsServiceForm } from './validation';
import useForm from '~/hooks/useForm';

const [TWILIO, MOCK] = ['twilio', 'mock'];

const SmsServiceSettings = (props) => {
  const { settings, loading, onSubmit } = props;

  const initialValues = {
    type: settings ? settings.type : '',
    accountSid: settings ? settings.accoundSid : '',
    authToken: settings ? settings.authToken : '',
    serviceSid: settings ? settings.serviceSid : '',
  };

  const handleSubmit = (values) => {
    onSubmit(update(settings, values));
  };

  const form = useForm(initialValues, validateSmsServiceForm, handleSubmit);

  React.useEffect(() => {
    if (!settings) return;

    form.setValues(settings);
  }, [settings]);

  return (
    <form className="iap-apps-form" onSubmit={form.handleSubmit}>
      <Field label="SMS Service">
        <Select
          value={form.values.type}
          disabled={loading}
          onChange={value => form.setValue('type', value)}
          placeholder="Select Service"
          errorMessage={form.errors.type}
        >
          <Option value={TWILIO} title="Twilio" />
          <Option value={MOCK} title="Mock" />
        </Select>
      </Field>

      {form.values.type === TWILIO && (
        <>
          <Field label="Auth Token">
            <Input
              name="authToken"
              value={form.values.authToken}
              autoComplete="off"
              placeholder="Specify Twilio Auth Token"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={loading}
              errorMessage={form.errors.authToken}
            />
          </Field>

          <Field label="Account SID">
            <Input
              name="accountSid"
              value={form.values.accountSid}
              autoComplete="off"
              placeholder="Specify Twilio Account SID"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={loading}
              errorMessage={form.errors.accountSid}
            />
          </Field>

          <Field label="Service SID">
            <Input
              name="serviceSid"
              value={form.values.serviceSid}
              autoComplete="off"
              placeholder="Specify Twilio Service SID"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={loading}
              errorMessage={form.errors.serviceSid}
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

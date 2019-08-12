import React, { useState } from 'react';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';

const MailServiceSettings = (props) => {
  const { loading, onCancel, onSubmit } = props;
  const [serviceName, setServiceName] = useState(props.serviceName || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(serviceName);
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Mail Service">
        <Select
          value={serviceName}
          disabled={loading}
          onChange={setServiceName}
          placeholder="Select Supported Service"
        >
          <Option value="mailgun" title="Mailgun" />
          <Option value="aws ses" title="Amazon SES" />
          <Option value="mock" title="Mock" />
        </Select>
      </Field>

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

export default MailServiceSettings;

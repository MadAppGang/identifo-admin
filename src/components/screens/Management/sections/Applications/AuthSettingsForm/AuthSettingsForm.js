import React from 'react';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';
import SaveIcon from '~/components/icons/SaveIcon';

const ApplicationAuthSettings = (props) => {
  const { loading } = props;

  return (
    <div className="iap-apps-form">
      <Field label="Authorization Way">
        <Select
          name="authWay"
          value=""
          disabled={loading}
          onChange={() => {}}
          placeholder="Select Authorization Way"
        >
          <Option value="no_authorization" title="No Authorization" />
          <Option value="internal" title="Internal" />
          <Option value="whitelist" title="Whitelist" />
          <Option value="blacklist" title="Blacklist" />
          <Option value="external" title="External" />
        </Select>
      </Field>

      <Field label="New User Default Role">
        <Input
          name="defaultRole"
          value=""
          autoComplete="off"
          placeholder="User role"
          onChange={() => {}}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save changes
        </Button>
        <Button
          transparent
          disabled={loading}
          onClick={props.onCancel}
        >
          Cancel
        </Button>
      </footer>
    </div>
  );
};

export default ApplicationAuthSettings;

/* eslint-disable react/prop-types */

import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { Select, Option } from '~/components/shared/Select';
import SaveIcon from '~/components/icons/SaveIcon';

const extractValue = fn => event => fn(event.target.value);

const ApplicationAuthSettings = (props) => {
  const { loading, application, onSubmit, onCancel } = props;

  const [authWay, setAuthWay] = useState(application.authorization_way || '');
  const [defaultRole, setDefaultRole] = useState(application.new_user_default_role || '');

  useEffect(() => {
    setAuthWay(application.authorization_way || '');
    setDefaultRole(application.new_user_default_role || '');
  }, [application]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(application, {
      authorization_way: authWay,
      new_user_default_role: defaultRole,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Authorization Way">
        <Select
          name="authWay"
          value={authWay}
          disabled={loading}
          onChange={setAuthWay}
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
          value={defaultRole}
          autoComplete="off"
          placeholder="User role"
          onChange={extractValue(setDefaultRole)}
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
          onClick={onCancel}
        >
          Cancel
        </Button>
      </footer>
    </form>
  );
};

export default ApplicationAuthSettings;

import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import { Select, Option } from '~/components/shared/Select';
import MultipleInput from '~/components/shared/MultipleInput';

const extractValue = fn => event => fn(event.target.value);

const ApplicationAuthSettings = (props) => {
  const { loading, onSubmit, onCancel } = props;

  const application = props.application || {};

  const [authWay, setAuthWay] = useState(application.authorization_way || '');
  const [defaultRole, setDefaultRole] = useState(application.new_user_default_role || '');
  const [whitelist, setWhitelist] = useState(application.roles_whitelist || []);
  const [blacklist, setBlacklist] = useState(application.roles_blacklist || []);

  useEffect(() => {
    setAuthWay(application.authorization_way || '');
    setDefaultRole(application.new_user_default_role || '');
    setWhitelist(application.roles_whitelist || []);
    setBlacklist(application.roles_blacklist || []);
  }, [props.application]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(application, {
      authorization_way: authWay,
      new_user_default_role: defaultRole,
      roles_whitelist: whitelist,
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <Field label="Authorization Way">
        <Select
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

      {authWay === 'whitelist' && (
        <Field label="Roles Whitelist">
          <MultipleInput
            values={whitelist}
            placeholder="Hit Enter to add role"
            onChange={setWhitelist}
          />
        </Field>
      )}

      {authWay === 'blacklist' && (
        <Field label="Roles Blacklist">
          <MultipleInput
            values={blacklist}
            placeholder="Hit Enter to add role"
            onChange={setBlacklist}
          />
        </Field>
      )}

      <Field label="New User Default Role">
        <Input
          value={defaultRole}
          autoComplete="off"
          placeholder="User role"
          onChange={extractValue(setDefaultRole)}
        />
      </Field>

      <footer className="iap-apps-form__footer">
        <Button
          type="submit"
          disabled={loading}
          Icon={loading ? LoadingIcon : SaveIcon}
        >
          Save Changes
        </Button>
        <Button transparent disabled={loading} onClick={onCancel}>
          Cancel
        </Button>
      </footer>
    </form>
  );
};

export default ApplicationAuthSettings;

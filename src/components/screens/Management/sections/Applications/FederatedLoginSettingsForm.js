/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import WarningIcon from '~/components/icons/WarningIcon.svg';

const extractValue = fn => e => fn(e.target.value);

const FederatedLoginSettingsForm = (props) => {
  const { loading, onSubmit, onCancel } = props;
  const application = props.application || {};
  const {
    apple_info: appleInfo = {
      client_id: '',
      client_secret: '',
    },
  } = application;
  const [appleClientId, setAppleClientId] = useState(appleInfo.client_id);
  const [appleClientSecret, setAppleClientSecret] = useState(appleInfo.client_secret);

  useEffect(() => {
    const { apple_info } = application;
    if (!apple_info) return;

    if (apple_info.client_id) {
      setAppleClientId(apple_info.client_id);
    }

    if (apple_info.client_secret) {
      setAppleClientSecret(apple_info.client_secret);
    }
  }, [props.application]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(application, {
      apple_info: {
        client_id: appleClientId,
        client_secret: appleClientSecret,
      },
    }));
  };

  return (
    <form className="iap-apps-form" onSubmit={handleSubmit}>
      <div className="iap-apps-form__note">
        <WarningIcon className="iap-apps-form__note-icon" />
        <p>
          Note that these settings take effect only when federated login is enabled in
          <Link className="iap-apps-form__note-link" to="/management/settings">
            Login Types
          </Link>
          settings.
        </p>
      </div>

      <Field label="Apple Client Id">
        <Input
          value={appleClientId}
          autoComplete="off"
          placeholder="Enter Client Id"
          onChange={extractValue(setAppleClientId)}
        />
      </Field>

      <Field label="Apple Client Secret">
        <Input
          value={appleClientSecret}
          autoComplete="off"
          placeholder="Enter Client Secret"
          onChange={extractValue(setAppleClientSecret)}
        />
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

export default FederatedLoginSettingsForm;

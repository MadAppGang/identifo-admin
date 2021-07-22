/* eslint-disable camelcase */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import update from '@madappgang/update-by-path';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import LoadingIcon from '~/components/icons/LoadingIcon';
import SaveIcon from '~/components/icons/SaveIcon';
import PlusIcon from '~/components/icons/AddIcon';
import WarningIcon from '~/components/icons/WarningIcon.svg';
import MultipleInput from '~/components/shared/MultipleInput';
import SectionHeader from '~/components/shared/SectionHeader';
import { Select, Option } from '~/components/shared/Select';

const extractValue = fn => e => fn(e.target.value);

const FederatedLoginSettingsForm = (props) => {
  const { loading, onSubmit, onCancel } = props;
  const application = props.application || {};

  // TODO: replace from server
  const providers = { apple: { Name: 'Apple' }, facebook: { Name: 'Facebook', default_scopes: ['email'] }, google: { Name: 'Google' } };

  const [federatedLoginSettings, setFederatedLoginSettings] = useState({});
  const [currentProviderKey, setCurrentProviderKey] = useState('');
  const [currentProvider, setCurrentProvider] = useState('');

  useEffect(() => {
    setFederatedLoginSettings(application.federated_login_settings || {});
  }, [props.application]);

  useEffect(() => {
    setCurrentProvider(federatedLoginSettings[currentProviderKey]);
  }, [currentProviderKey]);

  useEffect(() => {
    federatedLoginSettings[currentProviderKey] = currentProvider;
  }, [currentProvider]);

  const handleInput = (field, value) => {
    currentProvider[field] = value;
    setCurrentProvider({ ...currentProvider });
  };

  const deleteProvider = () => {
    delete federatedLoginSettings[currentProviderKey];
    setCurrentProvider(federatedLoginSettings[currentProviderKey]);
  };

  const addProvider = () => {
    const scopes = providers[currentProviderKey].default_scopes || [];
    federatedLoginSettings[currentProviderKey] = { key: '', secret: '', scopes };
    setCurrentProvider(federatedLoginSettings[currentProviderKey]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(update(application, {
      federated_login_settings: federatedLoginSettings,
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

      <Field label="Provider">
        <div className="iap-apps-form__provider_selector">
          <Select
            name="type"
            value={currentProviderKey}
            disabled={loading}
            onChange={setCurrentProviderKey}
            placeholder="Select Federated Provider"
          >
            {Object.entries(providers).map(v => <Option value={v[0]} title={v[1].Name} key={v[0]} />)}
          </Select>
          <div className="iap-apps-form__provider_selector_action">
            {currentProvider
              && (
                <Button error onClick={deleteProvider}>
                  Delete
                </Button>
              )
            }
            {!currentProvider
              && (
                <Button
                  onClick={addProvider}
                  Icon={loading ? LoadingIcon : PlusIcon}
                >
                  Add
                </Button>
              )
            }
          </div>
        </div>
      </Field>


      {
        currentProvider
        && (
          <>
            <Field label="Client Key">
              <Input
                value={currentProvider.key}
                autoComplete="off"
                placeholder="Enter Client Id"
                onChange={extractValue(v => handleInput('key', v))}
              />
            </Field>

            <Field label="Client Secret">
              <Input
                value={currentProvider.secret}
                autoComplete="off"
                placeholder="Enter Client Secret"
                onChange={extractValue(v => handleInput('secret', v))}
              />
            </Field>

            <Field label="Scopes">
              <MultipleInput
                values={currentProvider.scopes}
                placeholder="Hit Enter to add scope"
                onChange={v => handleInput('scopes', v)}
              />
            </Field>
          </>
        )
      }


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

export default FederatedLoginSettingsForm;

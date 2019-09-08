import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import StorageSettings from './StorageSettings';
import { fetchSettings, postSettings } from '~/modules/database/actions';
import DatabasePlaceholder from './Placeholder';
import { Tabs, Tab } from '~/components/shared/Tabs';

const StoragesSection = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const settings = useSelector(state => state.database.settings.config);
  const error = useSelector(state => state.database.settings.error);

  const startFetching = () => {
    setFetching(true);
    dispatch(fetchSettings());
  };

  useEffect(startFetching, []);

  useEffect(() => {
    if (settings || error) {
      setFetching(false);
    }
  }, [settings, error]);

  const handleSettingsSubmit = node => (nodeSettings) => {
    const updatedSettings = update(settings, {
      [node]: nodeSettings,
    });

    dispatch(postSettings(updatedSettings));
  };

  if (error) {
    return (
      <section className="iap-management-section">
        <DatabasePlaceholder
          fetching={fetching}
          onTryAgainClick={startFetching}
        />
      </section>
    );
  }

  const getStorageSettingsProps = (index) => {
    return [
      {
        title: 'Application Storage',
        description: 'Setup a connection to the database all the applications are stored in.',
        settings: settings ? settings.app_storage : null,
        postSettings: handleSettingsSubmit('app_storage'),
      },
      {
        title: 'User Storage',
        description: 'Setup a connection to the database all the users are stored in.',
        settings: settings ? settings.user_storage : null,
        postSettings: handleSettingsSubmit('user_storage'),
      },
      {
        title: 'Token Storage',
        description: 'Setup a connection to the database all the tokens are stored in.',
        settings: settings ? settings.token_storage : null,
        postSettings: handleSettingsSubmit('token_storage'),
      },
      {
        title: 'Verification Code Storage',
        description: 'Setup a connection to the database all the verification codes are stored in.',
        settings: settings ? settings.verification_code_storage : null,
        postSettings: handleSettingsSubmit('verification_code_storage'),
      },
      {
        title: 'Token Blacklist Storage',
        description: 'Setup a connection to the database all the blacklisted tokens are stored in.',
        settings: settings ? settings.token_blacklist : null,
        postSettings: handleSettingsSubmit('token_blacklist'),
      },
    ][index];
  };

  const [tabIndex, setTabIndex] = useState(0);

  const storageSettingsProps = getStorageSettingsProps(tabIndex);

  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Storages
        </p>
      </header>

      <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
        <Tab title="Applications" />
        <Tab title="Users" />
        <Tab title="Tokens" />
        <Tab title="Verification Codes" />
        <Tab title="Blacklist" />

        <StorageSettings fetching={fetching} {...storageSettingsProps} />
      </Tabs>

    </section>
  );
};

export default StoragesSection;

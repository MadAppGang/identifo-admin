import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import StorageSettings from './StorageSettings';
import { fetchSettings, postSettings } from '~/modules/database/actions';
import DatabasePlaceholder from './Placeholder';
import { Tabs, Tab } from '~/components/shared/Tabs';

const DatabaseSection = () => {
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
        description: 'Setup a connection to the database all the applications are stored at.',
        settings: settings ? settings.appStorage : null,
        postSettings: handleSettingsSubmit('appStorage'),
      },
      {
        title: 'User Storage',
        description: 'Setup a connection to the database all the users are stored at.',
        settings: settings ? settings.userStorage : null,
        postSettings: handleSettingsSubmit('userStorage'),
      },
      {
        title: 'Token Storage',
        description: 'Setup a connection to the database all the tokens are stored at.',
        settings: settings ? settings.tokenStorage : null,
        postSettings: handleSettingsSubmit('tokenStorage'),
      },
      {
        title: 'Verification Code Storage',
        description: 'Setup a connection to the database all the verification codes are stored at.',
        settings: settings ? settings.verificationCodeStorage : null,
        postSettings: handleSettingsSubmit('verificationCodeStorage'),
      },
    ][index];
  };

  const [tabIndex, setTabIndex] = useState(0);

  const storageSettingsProps = getStorageSettingsProps(tabIndex);

  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Database
        </p>
      </header>

      <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
        <Tab title="Applications" />
        <Tab title="Users" />
        <Tab title="Tokens" />
        <Tab title="Verification Codes" />

        <StorageSettings fetching={fetching} {...storageSettingsProps} />
      </Tabs>

    </section>
  );
};

export default DatabaseSection;

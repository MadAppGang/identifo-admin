import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import StorageSettings from './StorageSettings';
import { fetchSettings, postSettings } from '~/modules/database/actions';
import DatabasePlaceholder from './ConnectionSettings/Placeholder';

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

  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Database
        </p>
      </header>
      <StorageSettings
        title="Application Storage"
        description="These values are used to create a connection to the database all your applications are stored at."
        fetching={fetching}
        settings={settings ? settings.appStorage : null}
        postSettings={handleSettingsSubmit('appStorage')}
      />
      <StorageSettings
        title="User Storage"
        description="These values are used to create a connection to the database all your users are stored at."
        fetching={fetching}
        settings={settings ? settings.userStorage : null}
        postSettings={handleSettingsSubmit('userStorage')}
      />
      <StorageSettings
        title="Token Storage"
        description="These values are used to create a connection to the database all your users are stored at."
        fetching={fetching}
        settings={settings ? settings.tokenStorage : null}
        postSettings={handleSettingsSubmit('tokenStorage')}
      />
      <StorageSettings
        title="Verification Code Storage"
        description="These values are used to create a connection to the database all your users are stored at."
        fetching={fetching}
        settings={settings ? settings.verificationCodeStorage : null}
        postSettings={handleSettingsSubmit('verificationCodeStorage')}
      />
    </section>
  );
};

export default DatabaseSection;

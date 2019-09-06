import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from '~/components/shared/Tabs';
import GeneralTab from './ServerGeneralTab';
import JWTForm from './ServerJWTForm';
import ConfigurationForm from './ServerConfigurationForm';
import {
  uploadJWTKeys,
  fetchConfigurationStorageSettings,
  updateConfigurationStorageSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';

const GeneralSection = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const dispatch = useDispatch();
  const settings = useSelector(s => s.settings.configurationStorage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchConfigurationStorageSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    await dispatch(updateConfigurationStorageSettings(nextSettings));

    const { privateKey, publicKey } = nextSettings;
    if (privateKey && publicKey) {
      await dispatch(uploadJWTKeys(publicKey, privateKey));
    }

    setLoading(false);

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Server settings have been updated successfully',
    }));
  };

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Server Settings
      </p>

      <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
        <Tab title="General" />
        <Tab title="Token Settings" />
        <Tab title="Configuration Storage" />

        <>
          {tabIndex === 0 && <GeneralTab />}

          {tabIndex === 1 && (
            <JWTForm
              loading={loading}
              settings={settings}
              onSubmit={handleSubmit}
            />
          )}

          {tabIndex === 2 && (
            <ConfigurationForm
              loading={loading}
              settings={settings}
              onSubmit={handleSubmit}
            />
          )}
        </>
      </Tabs>
    </section>
  );
};

export default GeneralSection;

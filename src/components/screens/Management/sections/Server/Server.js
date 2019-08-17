import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs } from '~/components/shared/Tabs';
import GeneralForm from './ServerGeneralForm';
import JWTForm from './ServerJWTForm';
import ConfigurationTab from './ServerConfigurationTab';
import {
  fetchGeneralSettings, updateGeneralSettings,
} from '~/modules/settings/actions';
import { createNotification } from '~/modules/notifications/actions';

const GeneralSection = () => {
  const [tabIndex, setTabIndex] = useState(2);
  const dispatch = useDispatch();
  const settings = useSelector(s => s.settings.general);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      await dispatch(fetchGeneralSettings());
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (nextSettings) => {
    setLoading(true);
    await dispatch(updateGeneralSettings(nextSettings));
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
        <Tab title="General Settings" />
        <Tab title="JWT Settings" />
        <Tab title="Configuration Storage" />

        <>
          {tabIndex === 0 && (
            <GeneralForm
              loading={loading}
              settings={settings}
              onSubmit={handleSubmit}
            />
          )}

          {tabIndex === 1 && (
            <JWTForm
              loading={loading}
              settings={settings}
              onSubmit={handleSubmit}
            />
          )}

          {tabIndex === 2 && <ConfigurationTab />}
        </>
      </Tabs>
    </section>
  );
};

export default GeneralSection;

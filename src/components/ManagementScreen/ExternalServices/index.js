import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '~/components/shared/Tabs';
import MailServiceSettings from './MailServiceSettings';
import SmsServiceSettings from './SmsServiceSettings';
import { createNotification } from '~/modules/notifications/actions';
import {
  fetchExternalServicesSettings, updateExternalServicesSettings,
} from '~/modules/settings/actions';

const EmailIntegrationSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings.externalServices);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!settings) {
      setLoading(true);
      dispatch(fetchExternalServicesSettings());
    }
  }, []);

  useEffect(() => {
    if (settings && loading) {
      setLoading(false);
    }
  }, [settings]);

  const handleSubmit = async (service, value) => {
    setLoading(true);
    const nextSettings = update(settings, {
      [service]: value,
    });

    await dispatch(updateExternalServicesSettings(nextSettings));

    dispatch(createNotification({
      type: 'success',
      title: 'Updated',
      text: 'Settings have been updated successfully',
    }));
  };

  return (
    <section className="iap-management-section">
      <header>
        <p className="iap-management-section__title">
          External Services
        </p>

        <p className="iap-management-section__description">
          Configure external Email ans SMS service integrations
        </p>
      </header>

      <main className="iap-settings-section">
        <div className="iap-management-section__tabs">
          <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
            <Tab title="Email Service" />
            <Tab title="SMS Service" />

            <>
              {tabIndex === 0 && (
                <MailServiceSettings
                  loading={loading}
                  settings={settings ? settings.emailService : null}
                  onSubmit={value => handleSubmit('emailService', value)}
                />
              )}

              {tabIndex === 1 && (
                <SmsServiceSettings
                  loading={loading}
                  settings={settings ? settings.smsService : null}
                  onSubmit={value => handleSubmit('smsService', value)}
                />
              )}
            </>
          </Tabs>
        </div>
      </main>
    </section>
  );
};

export default EmailIntegrationSection;

import React, { useState, useEffect } from 'react';
import update from '@madappgang/update-by-path';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Tab } from '~/components/shared/Tabs';
import MailServiceSettings from './MailServiceSettings';
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

  const handleSubmit = (service, value) => {
    setLoading(true);
    const nextSettings = update(settings, {
      [service]: value,
    });
    dispatch(updateExternalServicesSettings(nextSettings));
  };

  return (
    <section className="iap-management-section">
      <header>
        <p className="iap-management-section__title">
          External Services
        </p>

        <p className="iap-management-section__description">
          Configure external Mail ans SMS service integrations
        </p>
      </header>

      <main className="iap-settings-section">
        <div className="iap-management-section__tabs">
          <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
            <Tab title="Mail Service" />
            <Tab title="SMS Service" />

            {tabIndex === 0 && (
              <MailServiceSettings
                loading={loading}
                serviceName={settings ? settings.mailService : ''}
                onSubmit={value => handleSubmit('mailService', value)}
              />
            )}
          </Tabs>
        </div>
      </main>
    </section>
  );
};

export default EmailIntegrationSection;

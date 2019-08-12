import React, { useState } from 'react';
import { Tabs, Tab } from '~/components/shared/Tabs';
import MailServiceSettings from './MailServiceSettings';

const EmailIntegrationSection = () => {
  const [tabIndex, setTabIndex] = useState(0);

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
              <MailServiceSettings serviceName="mailgun" onSubmit={() => {}} />
            )}
          </Tabs>
        </div>
      </main>
    </section>
  );
};

export default EmailIntegrationSection;

import React, { useState } from 'react';
import AccountSettings from './AdminAccount';
import SessionStorageSettings from './SessionStorageSettings';
import CredentialsEnvSettings from './CredentialsEnvSettings';
import { Tabs, Tab } from '~/components/shared/Tabs';

const AccountSection = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Account Settings
      </p>

      <Tabs
        activeTabIndex={tabIndex}
        onChange={setTabIndex}
      >
        <Tab title="Admin Account" />
        <Tab title="Session Storage" />
        <Tab title="Env" />

        <>
          {tabIndex === 0 && <AccountSettings />}
          {tabIndex === 1 && <SessionStorageSettings />}
          {tabIndex === 2 && <CredentialsEnvSettings />}
        </>
      </Tabs>
    </section>
  );
};

export default AccountSection;

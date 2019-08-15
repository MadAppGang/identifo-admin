import React, { useState } from 'react';
import { Tab, Tabs } from '~/components/shared/Tabs';
import StaticFilesGeneralForm from './StaticFilesGeneralForm';

const StaticFilesSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const settings = null;

  const handleSubmit = (nextSettings) => {
    setLoading(true);

    console.log(nextSettings);

    setLoading(false);
  };

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Static Files
      </p>

      <Tabs
        activeTabIndex={tabIndex}
        onChange={setTabIndex}
      >
        <Tab title="General Settings" />
        <Tab title="Email Templates" />

        <>
          {tabIndex === 0 && (
            <StaticFilesGeneralForm
              settings={settings || {}}
              loading={loading}
              onSubmit={handleSubmit}
            />
          )}
        </>
      </Tabs>
    </section>
  );
};

export default StaticFilesSection;

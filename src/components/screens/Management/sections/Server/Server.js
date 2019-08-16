import React, { useState } from 'react';
import { Tab, Tabs } from  '~/components/shared/Tabs';
import GeneralForm from './ServerGeneralForm';

const GeneralSection = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Server Settings
      </p>

      <Tabs activeTabIndex={tabIndex} onChange={setTabIndex}>
        <Tab title="General Settings" />
        <Tab title="JWT Settings" />

        <>
          {tabIndex === 0 && (
            <GeneralForm />
          )}

          {tabIndex === 1 && (
            <GeneralForm />
          )}
        </>
      </Tabs>
    </section>
  );
};

export default GeneralSection;

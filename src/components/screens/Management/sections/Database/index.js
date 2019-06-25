import React from 'react';
import AppStorageSettings from './AppStorageSettings';

const DatabaseSection = () => {
  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Database
        </p>
      </header>
      <AppStorageSettings />
    </section>
  );
};

export default DatabaseSection;

import React from 'react';
import Settings from './ConnectionSettings';
import AppStorageSettings from './AppStorageSettings';
import DatabaseConnectionState from './ConnectionSettings/ConnectionState';

const DatabaseSection = () => {
  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Database
        </p>
        <DatabaseConnectionState />
      </header>
      {/* <Settings /> */}
      <AppStorageSettings />
    </section>
  );
};

export default DatabaseSection;

import React from 'react';
import AppStorageSettings from './AppStorageSettings';
import UserStorageSettings from './UserStorageSettings';

const DatabaseSection = () => {
  return (
    <section className="iap-management-section">
      <header className="iap-management-section__header">
        <p className="iap-management-section__title">
          Database
        </p>
      </header>
      <AppStorageSettings />
      <UserStorageSettings />
    </section>
  );
};

export default DatabaseSection;

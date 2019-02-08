import React from 'react';
import Settings from './AdminAccount';
import './Settings.css';

const SettingsSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Settings
      </p>

      <Settings />

    </section>
  );
};

export default SettingsSection;

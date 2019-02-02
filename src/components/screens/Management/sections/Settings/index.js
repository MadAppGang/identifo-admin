import React from 'react';
import AdminAccountSettings from './AdminAccount';
import './Settings.css';

const SettingsSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Settings
      </p>

      <AdminAccountSettings />

    </section>
  );
};

export default SettingsSection;

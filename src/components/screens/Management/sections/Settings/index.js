import React from 'react';
import './Settings.css';

const SettingsSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Settings
      </p>

      <div className="iap-settings-section">
        <span className="iap-settings-section__title">
          Admin account
        </span>

        <p className="iap-settings-section__description">
          These are credentials used to login into admin panel.
        </p>

        <div className="iap-settings-section__info">
          <span>Email</span>
          <p className="iap-settings-section__email">
            admin@company.com
          </p>
        </div>

        <button
          type="button"
          className="iap-settings-section__update-btn"
        >
          Change
        </button>
      </div>

    </section>
  );
};

export default SettingsSection;

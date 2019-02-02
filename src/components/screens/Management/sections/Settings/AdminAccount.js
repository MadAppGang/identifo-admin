import React from 'react';

const AdminAccountSettings = () => {
  return (
    <div className="iap-settings-section">
      <span className="iap-settings-section__title">
        Admin account
      </span>

      <p className="iap-settings-section__description">
        These are credentials used to login into admin panel.
      </p>

      <div className="iap-settings-section__info">
        <span>Email (used as a login)</span>
        <p className="iap-settings-section__email">
          example13@company.org
        </p>
      </div>

      <button
        type="button"
        className="iap-settings-section__update-btn"
      >
        Update
      </button>
    </div>
  );
};

export default AdminAccountSettings;

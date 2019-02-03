import React from 'react';
import Button from '~/components/shared/Button';
import editIcon from './edit-white.svg';

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
        <span>
          Email
        </span>
        <p className="iap-settings-section__email">
          example13@company.org
        </p>
      </div>

      <Button>
        <img
          alt="edit"
          src={editIcon}
          className="iap-settings-section__edit-icon"
        />
        <span className="iap-settings-section__edit-btn-text">
          Edit admin account
        </span>
      </Button>
    </div>
  );
};

export default AdminAccountSettings;

import React from 'react';
import Input from '~/components/shared/Input';
import Button from '~/components/shared/Button';
import saveIcon from './save.svg';

const DatabaseConnectionSettings = () => {
  return (
    <div className="iap-db-connection-section">
      <span className="iap-settings-section__title">
        Connection settings
      </span>

      <p className="iap-settings-section__description">
        You should select from supported database types and provide a connection for it.
      </p>

      <div className="iap-db-form">
        <div className="iap-db-form__field">
          <span className="iap-db-form__label">
            Database type
          </span>
          <Input placeholder="Select database type" />
        </div>

        <div className="iap-db-form__field">
          <span className="iap-db-form__label">
            Region
          </span>
          <Input placeholder="e.g. ap-northeast-3" />
        </div>

        <Button icon={saveIcon}>
          Save changes
        </Button>
      </div>
    </div>
  );
};

export default DatabaseConnectionSettings;

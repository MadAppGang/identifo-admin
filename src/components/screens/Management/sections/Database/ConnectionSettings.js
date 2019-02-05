import React from 'react';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field'
import Button from '~/components/shared/Button';
import DatabaseDropdown from './DatabaseDropdown';
import saveIcon from './save.svg';

const DatabaseConnectionSettings = () => {
  return (
    <div className="iap-db-connection-section">
      <span className="iap-section__title">
        Connection settings
      </span>

      <p className="iap-section__description">
        You should select from supported database types and provide a connection for it.
      </p>

      <form className="iap-db-form">
        <Field label="Database type">
          <DatabaseDropdown />
        </Field>

        <Field label="Region">
          <Input placeholder="e.g. ap-northeast-3" />
        </Field>

        <footer className="iap-db-form__footer">
          <Button icon={saveIcon}>
            Save changes
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default DatabaseConnectionSettings;

import React from 'react';
import LoginTypesTable from './LoginTypesTable';

const LoginTypesSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Login Types
      </p>

      <p className="iap-management-section__description">
        These settings allow to turn off undesirable login endpoints.
      </p>

      <div className="iap-settings-section">
        <LoginTypesTable />
      </div>

    </section>
  );
};

export default LoginTypesSection;

import React from 'react';
import SectionHeader from '~/components/shared/SectionHeader';
import LoginTypesForm from './LoginTypesForm';

const LoginTypesSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Login Types
      </p>

      <div className="iap-settings-section">
        <SectionHeader
          title="Allowed login types"
          description="These settings allow to turn off undesirable login endpoints."
        />

        <LoginTypesForm />
      </div>

    </section>
  );
};

export default LoginTypesSection;

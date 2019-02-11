import React from 'react';
import Settings from './ConnectionSettings';

const DatabaseSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Database
      </p>

      <Settings />

    </section>
  );
};

export default DatabaseSection;

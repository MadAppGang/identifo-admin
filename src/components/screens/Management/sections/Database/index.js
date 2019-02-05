import React from 'react';
import ConnectionSettings from './ConnectionSettings';
import './Database.css';

const DatabaseSection = () => {
  return (
    <section className="iap-management-section">
      <p className="iap-management-section__title">
        Database
      </p>

      <ConnectionSettings />

    </section>
  );
};

export default DatabaseSection;

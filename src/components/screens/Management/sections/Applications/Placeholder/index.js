import React from 'react';
import applicationsIcon from './applications.svg';
import plusIcon from './plus-white.svg';
import Button from '~/components/shared/Button';
import './ApplicationsPlaceholder.css';

const ApplicationsPlaceholder = () => {
  return (
    <div className="iap-section-placehoder">
      <h2 className="iap-section-placeholder__title">
        Applications
      </h2>

      <img
        alt="applications"
        src={applicationsIcon}
        className="iap-section-placeholder__icon"
      />

      <p className="iap-section-placeholder__msg">
        No applications have been added so far.
      </p>

      <Button icon={plusIcon}>
        Create application
      </Button>
    </div>
  );
};

export default ApplicationsPlaceholder;

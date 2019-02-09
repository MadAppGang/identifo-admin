import React from 'react';
import Button from '~/components/shared/Button';
import applicationsIcon from '~/assets/icons/applications-placeholder.svg';
import plusIcon from '~/assets/icons/plus.svg';

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

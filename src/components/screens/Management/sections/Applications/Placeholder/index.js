import React from 'react';
import Button from '~/components/shared/Button';
import ApplicationsIcon from '~/components/icons/ApplicationsIcon';
import AddIcon from '~/components/icons/AddIcon';

const ApplicationsPlaceholder = () => {
  return (
    <div className="iap-section-placehoder">
      <h2 className="iap-section-placeholder__title">
        Applications
      </h2>

      <ApplicationsIcon className="iap-section-placeholder__icon" />

      <p className="iap-section-placeholder__msg">
        No applications have been added so far.
      </p>

      <Button Icon={AddIcon}>
        Create application
      </Button>
    </div>
  );
};

export default ApplicationsPlaceholder;

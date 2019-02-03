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

      <Button>
        <img
          alt="add"
          src={plusIcon}
          className="iap-section-placeholder__add-icon"
        />
        <span className="iap-section-placeholder__btn-text">
          Create application
        </span>
      </Button>
    </div>
  );
};

export default ApplicationsPlaceholder;

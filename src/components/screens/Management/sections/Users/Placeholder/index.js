import React from 'react';
import usersIcon from './user.svg';
import plusIcon from './plus-white.svg';
import Button from '~/components/shared/Button';
import './UsersPlaceholder.css';

const UsersPlaceholder = () => {
  return (
    <div className="iap-section-placehoder">
      <h2 className="iap-section-placeholder__title">
        Users
      </h2>

      <img
        alt="users"
        src={usersIcon}
        className="iap-section-placeholder__icon"
      />

      <p className="iap-section-placeholder__msg">
        No users have been added to your applications.
      </p>

      <Button icon={plusIcon}>
        Create your first user
      </Button>
    </div>
  );
};

export default UsersPlaceholder;

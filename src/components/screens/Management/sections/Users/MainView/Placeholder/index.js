import React from 'react';
import Button from '~/components/shared/Button';
import AddIcon from '~/components/icons/AddIcon';
import UsersIcon from '~/components/icons/UsersIcon';
import './UsersPlaceholder.css';

const UsersPlaceholder = () => {
  return (
    <div className="iap-section-placehoder">
      <h2 className="iap-section-placeholder__title">
        Users
      </h2>

      <UsersIcon className="iap-section-placeholder__icon" />

      <p className="iap-section-placeholder__msg">
        No users have been added to your applications.
      </p>

      <Button Icon={AddIcon}>
        Create your first user
      </Button>
    </div>
  );
};

export default UsersPlaceholder;

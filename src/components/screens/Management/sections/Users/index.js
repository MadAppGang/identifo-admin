import React from 'react';
import usersIcon from './user.svg';
import plusIcon from './plus-white.svg';
import Button from '~/components/shared/Button';
import './UsersSection.css';

const UsersSection = () => {
  return (
    <section className="iap-management-section">
      <div className="iap-users-placehoder">
        <h2 className="iap-users-placeholder__title">
          Users
        </h2>

        <img src={usersIcon} alt="users" className="iap-users-placeholder__icon" />

        <p className="iap-users-placeholder__msg">
          No users have been added to your applications.
        </p>

        <Button>
          <img
            src={plusIcon}
            alt="add"
            className="iap-users-placeholder__add-icon"
          />
          <span className="iap-users-placeholder__btn-text">
            Create your first user
          </span>
        </Button>
      </div>
    </section>
  );
};

export default UsersSection;

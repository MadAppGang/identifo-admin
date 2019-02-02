import React from 'react';
import accountIcon from './account.svg';
import './AccountIcon.css';

const AccountIcon = () => (
  <img
    className="iap-account-icon"
    alt="logout"
    src={accountIcon}
  />
);

export default AccountIcon;

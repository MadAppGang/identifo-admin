import React from 'react';
import AccountIcon from '~/components/icons/AccountIcon';

const AccountSection = () => (
  <button
    type="button"
    className="iap-profile-dropdown__section"
  >
    <AccountIcon />
    <span>Account</span>
  </button>
);

export default AccountSection;

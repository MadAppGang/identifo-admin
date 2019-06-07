import React from 'react';
import DropdownIcon from '~/components/icons/DropdownIcon';
import LogoutSection from './LogoutSection';
import AccountSection from './AccountSection';
import Dropdown from '~/components/shared/Dropdown';
import './Profile.css';

const ProfileDropdown = () => {
  return (
    <Dropdown>
      {({ isOpen, open, close }) => (
        <div className="iap-header-profile">
          <button
            type="button"
            className="iap-header-profile__trigger"
            onClick={open}
          >
            <span>Admin Panel</span>
            <DropdownIcon className="iap-dropdown-icon" />
          </button>
          {isOpen && (
            <div className="iap-profile-dropdown">
              <AccountSection onClick={close} />
              <LogoutSection onClick={close} />
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
};

export default ProfileDropdown;

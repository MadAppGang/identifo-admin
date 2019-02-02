import React from 'react';
import DropdownIcon from '~/components/icons/DropdownIcon';
import LogoutSection from './LogoutSection';
import Dropdown from '~/components/shared/Dropdown';
import './Profile.css';

const ProfileDropdown = () => {
  return (
    <Dropdown>
      {({ isOpen, open }) => (
        <div className="iap-header-profile">
          <button
            type="button"
            className="iap-header-profile__trigger"
            onClick={open}
          >
            <span>Admin Panel</span>
            <DropdownIcon />
          </button>
          {isOpen && (
            <div className="iap-profile-dropdown">
              <LogoutSection />
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
};

export default ProfileDropdown;

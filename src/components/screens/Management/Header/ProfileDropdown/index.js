import React from 'react';
import useDropdown from 'use-dropdown';
import DropdownIcon from '~/components/icons/DropdownIcon';
import LogoutSection from './LogoutSection';
import AccountSection from './AccountSection';
import './Profile.css';

const ProfileDropdown = () => {
  const [containerRef, isOpen, open, close] = useDropdown();

  return (
    <div className="iap-header-profile" ref={containerRef}>
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
  );
};

export default ProfileDropdown;

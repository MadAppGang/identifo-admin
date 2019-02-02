import React from 'react';
import Container from '~/components/shared/Container';
import ProfileDropdown from './ProfileDropdown';
import './Header.css';

const ManagementScreenHeader = () => {
  return (
    <header className="iap-management-header">
      <Container>
        <div className="iap-management-header__inner">
          <span className="iap-management-header__logo">
            Identifo
          </span>
          <ProfileDropdown />
        </div>
      </Container>
    </header>
  );
};

export default ManagementScreenHeader;

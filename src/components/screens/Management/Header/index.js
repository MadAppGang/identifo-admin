import React from 'react';
import { Link } from 'react-router-dom';
import Container from '~/components/shared/Container';
import ProfileDropdown from './ProfileDropdown';
import './Header.css';

const ManagementScreenHeader = () => {
  return (
    <header className="iap-management-header">
      <Container>
        <div className="iap-management-header__inner">
          <Link to="/management" className="rrdl">
            <span className="iap-management-header__logo">
              identifo
            </span>
          </Link>
          <ProfileDropdown />
        </div>
      </Container>
    </header>
  );
};

export default ManagementScreenHeader;

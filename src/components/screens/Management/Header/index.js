import React from 'react';
import Container from '~/components/shared/Container';
import './Header.css';

const ManagementScreenHeader = () => {
  return (
    <header className="iap-management-header">
      <Container>
        <div className="iap-management-header__valign">
          <span className="iap-management-header__logo">
            Identifo
          </span>
        </div>
      </Container>
    </header>
  );
};

export default ManagementScreenHeader;

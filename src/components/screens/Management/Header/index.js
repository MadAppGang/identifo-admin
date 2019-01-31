import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const ManagementScreenHeader = ({ children }) => {
  return (
    <header className="iap-management-header">
      {children}
    </header>
  );
};

ManagementScreenHeader.propTypes = {
  children: PropTypes.node,
};

ManagementScreenHeader.defaultProps = {
  children: null,
};

export default ManagementScreenHeader;

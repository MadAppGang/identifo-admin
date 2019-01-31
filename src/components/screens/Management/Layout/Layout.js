import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const ManagementScreenLayout = ({ children }) => {
  return (
    <div className="iap-management-layout">
      {children}
    </div>
  );
};

ManagementScreenLayout.propTypes = {
  children: PropTypes.node,
};

ManagementScreenLayout.defaultProps = {
  children: null,
};

export default ManagementScreenLayout;

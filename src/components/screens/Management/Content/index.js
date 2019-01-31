import React from 'react';
import PropTypes from 'prop-types';
import './Content.css';

const ManagementScreenContent = ({ children }) => {
  return (
    <div className="iap-management-content">
      {children}
    </div>
  );
};

ManagementScreenContent.propTypes = {
  children: PropTypes.node,
};

ManagementScreenContent.defaultProps = {
  children: null,
};

export default ManagementScreenContent;

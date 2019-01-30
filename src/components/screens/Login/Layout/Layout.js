import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const LoginScreenLayout = ({ children }) => (
  <div className="iap-login-layout">
    {children}
  </div>
);

LoginScreenLayout.propTypes = {
  children: PropTypes.node,
};

LoginScreenLayout.defaultProps = {
  children: null,
};

export default LoginScreenLayout;

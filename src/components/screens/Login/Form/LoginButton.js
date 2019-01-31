import React from 'react';
import PropTypes from 'prop-types';
import loadingIcon from './loading.svg';

const LoginButton = ({ loading, onClick }) => (
  <button
    type="button"
    className="iap-login-form__submit-btn"
    disabled={loading}
    onClick={onClick}
  >
    {loading && (
      <img
        src={loadingIcon}
        alt="spinner"
        className="iap-login-form__submit-indicator"
      />
    )}
    Sign In
  </button>
);

LoginButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

LoginButton.defaultProps = {
  loading: false,
};

export default LoginButton;

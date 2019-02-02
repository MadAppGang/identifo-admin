import React from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '~/components/icons/LoadingIcon';

const LoginButton = ({ loading, onClick }) => (
  <button
    type="button"
    className="iap-login-form__submit-btn"
    disabled={loading}
    onClick={onClick}
  >
    {loading && <LoadingIcon />}
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

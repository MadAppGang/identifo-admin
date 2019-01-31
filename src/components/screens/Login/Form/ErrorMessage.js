import React from 'react';
import PropTypes from 'prop-types';

const LoginErrorMessage = ({ message, onClick }) => (
  <div className="iap-login-form__error-msg">
    <button
      type="button"
      tabIndex={-1}
      onClick={onClick}
    >
      {message}
    </button>
  </div>
);

LoginErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

LoginErrorMessage.defaultProps = {
  onClick: null,
};

export default LoginErrorMessage;

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = ({ errorMessage, ...props }) => (
  <input
    {...props}
    spellCheck={false}
    className="iap-login-form__input"
  />
);

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  placeholder: '',
  value: '',
  errorMessage: '',
  onChange: () => {},
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = (props) => (
  <input
    {...props}
    className="iap-login-form__input"
  />
);

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  placeholder: '',
  value: '',
  onChange: () => {},
};

export default Input;

import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = (props) => {
  const {
    name, type, value, placeholder, onChange,
  } = props;

  return (
    <input
      name={name}
      type={type}
      className="iap-login-form__input"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

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

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Input.css';

const Input = ({ Icon, errorMessage, ...props }) => {
  const className = classnames({
    'iap-login-form__input': true,
    'iap-login-form__input--iconized': !!Icon,
  });

  return (
    <div className="iap-input-wrapper">
      {!!Icon && (
        <Icon className="iap-input-icon" />
      )}
      <input
        {...props}
        spellCheck={false}
        className={className}
      />
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  errorMessage: PropTypes.string,
  Icon: PropTypes.func,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  placeholder: '',
  value: '',
  errorMessage: '',
  Icon: null,
  onChange: () => {},
};

export default Input;

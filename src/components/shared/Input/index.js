import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Input.css';

const Input = React.forwardRef(({ Icon, errorMessage, renderButton, ...props }, ref) => {
  const className = classnames({
    'iap-login-form__input': true,
    'iap-login-form__input--iconized': !!Icon,
    'iap-login-form__input--invalid': !!errorMessage,
  });

  return (
    <div className="iap-input-wrapper">
      {!!Icon && (
        <Icon className="iap-input-icon" />
      )}
      <input
        ref={ref}
        {...props}
        spellCheck={false}
        autoComplete="off"
        className={className}
      />

      {!!renderButton && (
        <div className="iap-input-btn">
          {renderButton()}
        </div>
      )}
      {errorMessage && (
        <p className="iap-input-error">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

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

import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => {
  const className = classnames({
    'iap-btn': true,
    'iap-btn--stretch': props.stretch,
    'iap-btn--iconized': !!props.icon,
  });

  return (
    <button
      type={props.type}
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon && (
        <img
          alt="save"
          src={props.icon}
          className="iap-btn__icon"
        />
      )}
      <span>
        {props.children}
      </span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  stretch: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
  children: null,
  disabled: false,
  stretch: false,
};

export default Button;

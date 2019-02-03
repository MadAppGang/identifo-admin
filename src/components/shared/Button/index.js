import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => (
  <button
    type={props.type}
    className={'iap-btn'.concat(props.stretch ? ' iap-btn--stretch' : '')}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

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

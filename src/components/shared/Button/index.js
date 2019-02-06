import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ stretch, icon, children, ...props }) => {
  const className = classnames({
    'iap-btn': true,
    'iap-btn--stretch': stretch,
    'iap-btn--iconized': !!icon,
  });

  return (
    <button
      className={className}
      {...props}
    >
      {icon && (
        <img
          alt="save"
          src={icon}
          className="iap-btn__icon"
        />
      )}
      <span>
        {children}
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
  icon: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
  children: null,
  disabled: false,
  stretch: false,
  icon: null,
};

export default Button;

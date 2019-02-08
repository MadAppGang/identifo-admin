import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ stretch, icon, children, transparent, ...props }) => {
  const className = classnames({
    'iap-btn': true,
    'iap-btn--stretch': stretch,
    'iap-btn--iconized': !!icon,
    'iap-btn--transparent': transparent,
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
  transparent: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
  children: null,
  disabled: false,
  stretch: false,
  transparent: false,
  icon: null,
};

export default Button;

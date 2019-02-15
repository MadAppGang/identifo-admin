import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({ stretch, Icon, children, transparent, ...props }) => {
  const className = classnames({
    'iap-btn': true,
    'iap-btn--stretch': stretch,
    'iap-btn--iconized': !!Icon,
    'iap-btn--transparent': transparent,
  });

  return (
    <button
      className={className}
      {...props}
    >
      {Icon && (
        <Icon className="iap-btn__icon" />
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
  transparent: PropTypes.bool,
  Icon: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
  children: null,
  disabled: false,
  stretch: false,
  transparent: false,
  Icon: null,
};

export default Button;

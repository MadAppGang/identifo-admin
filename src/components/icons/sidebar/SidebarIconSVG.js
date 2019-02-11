import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const SidebarIconSVG = ({ viewBox, active, children }) => {
  const className = classnames({
    'iap-sidebarnav-icon': true,
    'iap-sidebarnav-icon--active': active,
  });

  return (
    <svg viewBox={viewBox} className={className}>
      {children}
    </svg>
  );
};

SidebarIconSVG.propTypes = {
  children: PropTypes.node,
  active: PropTypes.bool,
  viewBox: PropTypes.string.isRequired,
};

SidebarIconSVG.defaultProps = {
  children: null,
  active: false,
};

export default SidebarIconSVG;

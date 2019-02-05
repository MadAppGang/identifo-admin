import React from 'react';
import PropTypes from 'prop-types';

const SidebarIcon = ({ active, activeIcon, regularIcon }) => (
  <img
    alt="icon"
    src={active ? activeIcon : regularIcon}
    className="iap-management-sidebar__section-icon"
  />
);

SidebarIcon.propTypes = {
  active: PropTypes.bool.isRequired,
  activeIcon: PropTypes.string.isRequired,
  regularIcon: PropTypes.string.isRequired,
};

export default SidebarIcon;

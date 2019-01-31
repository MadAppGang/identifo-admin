import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const SidebarSection = ({ path, title, match }) => {
  const isActive = match.params.section === path.split('/').pop();

  return (
    <NavLink
      to={path}
      className="iap-management-sidebar__section"
      activeClassName="iap-management-sidebar__section--active"
    >
      {isActive && (
        <div className="iap-management-sidebar__indicator" />
      )}
      {title}
    </NavLink>
  );
};

SidebarSection.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withRouter(SidebarSection);

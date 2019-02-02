import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const SidebarSection = (props) => {
  const {
    path, title, icons, match,
  } = props;
  const isActive = match.params.section === path.split('/')[2];
  const icon = icons[isActive ? 1 : 0];

  return (
    <NavLink
      exact
      to={path}
      className="iap-management-sidebar__section"
      activeClassName="iap-management-sidebar__section--active"
    >
      <img
        alt="icon"
        src={icon}
        className="iap-management-sidebar__section-icon"
      />
      <span>{title}</span>
    </NavLink>
  );
};

SidebarSection.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      section: PropTypes.string,
    }),
  }).isRequired,
};

export { SidebarSection };

export default withRouter(SidebarSection);

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const SidebarSection = (props) => {
  const { path, title, match, Icon } = props;
  const isActive = match.params.section === path.split('/')[2];

  return (
    <NavLink
      exact
      to={path}
      className="iap-management-sidebar__section"
      activeClassName="iap-management-sidebar__section--active"
    >
      <Icon active={isActive} />
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
  Icon: PropTypes.func.isRequired,
};

export { SidebarSection };

export default withRouter(SidebarSection);

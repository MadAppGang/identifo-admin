import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

const SidebarSection = (props) => {
  const { exact, path, title, Icon } = props;

  return (
    <NavLink
      exact={exact}
      to={path}
      className="iap-management-sidebar__section"
      activeClassName="iap-management-sidebar__section--active"
    >
      <Icon className="iap-sidebarnav-icon" />
      <span>{title}</span>
    </NavLink>
  );
};

SidebarSection.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  exact: PropTypes.bool,
};

SidebarSection.defaultProps = {
  exact: false,
};

export { SidebarSection };

export default withRouter(SidebarSection);

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './users.svg';
import activeIcon from './users-colored.svg';

const UsersIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

UsersIcon.propTypes = {
  active: PropTypes.bool,
};

UsersIcon.defaultProps = {
  active: false,
};

export { UsersIcon };

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './database.svg';
import activeIcon from './database-colored.svg';

const DatabaseIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

DatabaseIcon.propTypes = {
  active: PropTypes.bool,
};

DatabaseIcon.defaultProps = {
  active: false,
};

export { DatabaseIcon };

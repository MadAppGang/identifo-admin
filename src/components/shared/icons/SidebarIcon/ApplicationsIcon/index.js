import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './applications.svg';
import activeIcon from './applications-colored.svg';

const ApplicationsIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

ApplicationsIcon.propTypes = {
  active: PropTypes.bool,
};

ApplicationsIcon.defaultProps = {
  active: false,
};

export { ApplicationsIcon };

import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './getting-started.svg';
import activeIcon from './getting-started-colored.svg';

const GettingStartedIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

GettingStartedIcon.propTypes = {
  active: PropTypes.bool,
};

GettingStartedIcon.defaultProps = {
  active: false,
};

export { GettingStartedIcon };

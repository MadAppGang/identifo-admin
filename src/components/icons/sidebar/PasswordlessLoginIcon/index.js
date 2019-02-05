import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './passwordless.svg';
import activeIcon from './passwordless-colored.svg';

const PasswordlessLoginIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

PasswordlessLoginIcon.propTypes = {
  active: PropTypes.bool,
};

PasswordlessLoginIcon.defaultProps = {
  active: false,
};

export { PasswordlessLoginIcon };

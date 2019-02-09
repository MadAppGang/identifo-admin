import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import regularIcon from '~/assets/icons/passwordless.svg';
import activeIcon from '~/assets/icons/passwordless-colored.svg';

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

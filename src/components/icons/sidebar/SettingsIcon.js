import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import regularIcon from '~/assets/icons/settings.svg';
import activeIcon from '~/assets/icons/settings-colored.svg';

const SettingsIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

SettingsIcon.propTypes = {
  active: PropTypes.bool,
};

SettingsIcon.defaultProps = {
  active: false,
};

export { SettingsIcon };

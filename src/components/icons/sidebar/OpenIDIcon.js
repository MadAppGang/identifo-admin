import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import regularIcon from '~/assets/icons/openid.svg';
import activeIcon from '~/assets/icons/openid-colored.svg';

const OpenIDIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

OpenIDIcon.propTypes = {
  active: PropTypes.bool,
};

OpenIDIcon.defaultProps = {
  active: false,
};

export { OpenIDIcon };

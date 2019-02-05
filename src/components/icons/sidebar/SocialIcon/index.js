import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './social.svg';
import activeIcon from './social-colored.svg';

const SocialIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

SocialIcon.propTypes = {
  active: PropTypes.bool,
};

SocialIcon.defaultProps = {
  active: false,
};

export { SocialIcon };

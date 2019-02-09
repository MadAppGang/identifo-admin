import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import regularIcon from '~/assets/icons/multi-factor.svg';
import activeIcon from '~/assets/icons/multi-factor-colored.svg';

const MultiFactorAuthIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

MultiFactorAuthIcon.propTypes = {
  active: PropTypes.bool,
};

MultiFactorAuthIcon.defaultProps = {
  active: false,
};

export { MultiFactorAuthIcon };

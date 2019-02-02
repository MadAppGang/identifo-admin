import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './multi-factor.svg';
import activeIcon from './multi-factor-colored.svg';

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

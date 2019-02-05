import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import regularIcon from './hosted-pages.svg';
import activeIcon from './hosted-pages-colored.svg';

const HostedPagesIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

HostedPagesIcon.propTypes = {
  active: PropTypes.bool,
};

HostedPagesIcon.defaultProps = {
  active: false,
};

export { HostedPagesIcon };

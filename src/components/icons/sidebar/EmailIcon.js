import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';
import regularIcon from '~/assets/icons/email.svg';
import activeIcon from '~/assets/icons/email-colored.svg';

const EmailIcon = ({ active }) => (
  <Icon
    active={active}
    regularIcon={regularIcon}
    activeIcon={activeIcon}
  />
);

EmailIcon.propTypes = {
  active: PropTypes.bool,
};

EmailIcon.defaultProps = {
  active: false,
};

export { EmailIcon };

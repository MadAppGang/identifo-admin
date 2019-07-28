import React from 'react';
import classnames from 'classnames';
import AccountIcon from './account.svg';

import './SidebarIcon.css';

const SidebarAccountIcon = ({ active }) => {
  const className = classnames({
    'iap-sidebarnav-icon': true,
    'iap-sidebarnav-icon--active': active,
  });

  return (
    <AccountIcon className={className} />
  );
};

export { SidebarAccountIcon as AccountIcon };

export { UsersIcon } from './UsersIcon';
export { GettingStartedIcon } from './GettingStartedIcon';
export { DatabaseIcon } from './DatabaseIcon';
export { ApplicationsIcon } from './ApplicationsIcon';
export { EmailIcon } from './EmailIcon';
export { SettingsIcon } from './SettingsIcon';
export { SocialIcon } from './SocialIcon';
export { OpenIDIcon } from './OpenIDIcon';
export { PasswordlessLoginIcon } from './PasswordlessLoginIcon';
export { MultiFactorAuthIcon } from './MultiFactorAuthIcon';
export { HostedPagesIcon } from './HostedPagesIcon';

import React, { Component } from 'react';
import Section from './Section';
import './Sidebar.css';
import gettingStartedIcon from './icons/getting-started.svg';
import gettingStartedIconActive from './icons/getting-started-colored.svg';
import usersIcon from './icons/users.svg';
import usersIconActive from './icons/users-colored.svg';
import databaseIcon from './icons/database.svg';
import databaseIconActive from './icons/database-colored.svg';
import applicationsIcon from './icons/applications.svg';
import applicationsIconActive from './icons/applications-colored.svg';
import emailIcon from './icons/email.svg';
import emailIconActive from './icons/email-colored.svg';
import settingsIcon from './icons/settings.svg';
import settingsIconActive from './icons/settings-colored.svg';
import socialIcon from './icons/social.svg';
import socialIconActive from './icons/social-colored.svg';
import openIDIcon from './icons/openid.svg';
import openIDIconActive from './icons/openid-colored.svg';
import passwordlessIcon from './icons/passwordless.svg';
import passwordlessIconActive from './icons/passwordless-colored.svg';
import hostedPagesIcon from './icons/hosted-pages.svg';
import hostedPagesIconActive from './icons/hosted-pages-colored.svg';
import multiFactorIcon from './icons/multi-factor.svg';
import multiFactorIconActive from './icons/multi-factor-colored.svg';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Getting started',
          path: '/management',
          icons: [gettingStartedIcon, gettingStartedIconActive],
        },
        {
          title: 'Users',
          path: '/management/users',
          icons: [usersIcon, usersIconActive],
        },
        {
          title: 'Users Database',
          path: '/management/database',
          icons: [databaseIcon, databaseIconActive],
        },
        {
          title: 'Applications',
          path: '/management/applications',
          icons: [applicationsIcon, applicationsIconActive],
        },
        {
          title: 'Email Integration',
          path: '/management/email_integration',
          icons: [emailIcon, emailIconActive],
        },
        {
          title: 'Settings',
          path: '/management/settings',
          icons: [settingsIcon, settingsIconActive],
        },
        {
          title: 'OpenID Settings',
          path: '/management/openid',
          icons: [openIDIcon, openIDIconActive],
        },
        {
          title: 'Social Login',
          path: '/management/social_login',
          icons: [socialIcon, socialIconActive],
        },
        {
          title: '2FA',
          path: '/management/multi-factor_auth',
          icons: [multiFactorIcon, multiFactorIconActive],
        },
        {
          title: 'Passwordless login',
          path: '/management/passwordless_login',
          icons: [passwordlessIcon, passwordlessIconActive],
        },
        {
          title: 'Hosted Pages',
          path: '/management/hosted_pages',
          icons: [hostedPagesIcon, hostedPagesIconActive],
        },
      ],
    };
  }

  render() {
    const { sections } = this.state;

    return (
      <aside className="iap-management-sidebar">
        {sections.map(section => <Section key={section.title} {...section} />)}
      </aside>
    );
  }
}

export default Sidebar;

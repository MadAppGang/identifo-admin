import React, { Component } from 'react';
import Section from './Section';
import * as iconComponents from '~/components/icons/SidebarIcon';
import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Getting started',
          path: '/management',
          Icon: iconComponents.GettingStartedIcon,
        },
        {
          title: 'Users',
          path: '/management/users',
          Icon: iconComponents.UsersIcon,
        },
        {
          title: 'Users Database',
          path: '/management/database',
          Icon: iconComponents.DatabaseIcon,
        },
        {
          title: 'Applications',
          path: '/management/applications',
          Icon: iconComponents.ApplicationsIcon,
        },
        {
          title: 'Email Integration',
          path: '/management/email_integration',
          Icon: iconComponents.EmailIcon,
        },
        {
          title: 'Settings',
          path: '/management/settings',
          Icon: iconComponents.SettingsIcon,
        },
        {
          title: 'OpenID Settings',
          path: '/management/openid',
          Icon: iconComponents.OpenIDIcon,
        },
        {
          title: 'Social Login',
          path: '/management/social_login',
          Icon: iconComponents.SocialIcon,
        },
        {
          title: 'Multi-factor Auth',
          path: '/management/multi-factor_auth',
          Icon: iconComponents.MultiFactorAuthIcon,
        },
        {
          title: 'Passwordless Login',
          path: '/management/passwordless_login',
          Icon: iconComponents.PasswordlessLoginIcon,
        },
        {
          title: 'Hosted Pages',
          path: '/management/hosted_pages',
          Icon: iconComponents.HostedPagesIcon,
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

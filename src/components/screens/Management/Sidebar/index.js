import React, { Component } from 'react';
import Section from './Section';
import './Sidebar.css';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Getting started',
          path: '/management',
        },
        {
          title: 'Users',
          path: '/management/users',
        },
        {
          title: 'Users Database',
          path: '/management/database',
        },
        {
          title: 'Applications',
          path: '/management/applications',
        },
        {
          title: 'Email Integration',
          path: '/management/email_integration',
        },
        {
          title: 'Settings',
          path: '/management/settings',
        },
        {
          title: 'OpenID Settings',
          path: '/management/openid',
        },
        {
          title: 'Social Login',
          path: '/management/social_login',
        },
        {
          title: '2FA',
          path: '/management/multi-factor_auth',
        },
        {
          title: 'Passwordless login',
          path: '/management/passwordless_login',
        },
        {
          title: 'Hosted Pages',
          path: '/management/hosted_pages',
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

import React, { Component } from 'react';
import StaticFilesIcon from '~/components/icons/StaticFilesIcon.svg';
import UsersIcon from '~/components/icons/UsersIcon.svg';
import GettingStartedIcon from '~/components/icons/GettingStartedIcon.svg';
import AdminIcon from '~/components/icons/AdminIcon.svg';
import DatabaseIcon from '~/components/icons/DatabaseIcon.svg';
import ApplicationsIcon from '~/components/icons/ApplicationsIcon.svg';
import ExternalServicesIcon from '~/components/icons/ExternalServicesIcon.svg';
import LoginTypesIcon from '~/components/icons/LoginTypesIcon.svg';
import MultiFactorAuthIcon from '~/components/icons/MultiFactorAuthIcon.svg';
import HostedPagesIcon from '~/components/icons/HostedPagesIcon.svg';
import Section from './Section';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Getting started',
          path: '/management',
          exact: true,
          Icon: GettingStartedIcon,
          disabled: true,
        },
        {
          title: 'Users',
          path: '/management/users',
          Icon: UsersIcon,
        },
        {
          title: 'Account',
          path: '/management/account',
          Icon: AdminIcon,
        },
        {
          title: 'Storages',
          path: '/management/database',
          Icon: DatabaseIcon,
        },
        {
          title: 'Applications',
          path: '/management/applications',
          Icon: ApplicationsIcon,
        },
        {
          title: 'Login Types',
          path: '/management/settings',
          Icon: LoginTypesIcon,
        },
        {
          title: 'External Services',
          path: '/management/email_integration',
          Icon: ExternalServicesIcon,
        },
        {
          title: 'Static Files',
          path: '/management/static',
          Icon: StaticFilesIcon,
        },
        {
          title: 'Multi-factor Auth',
          path: '/management/multi-factor_auth',
          Icon: MultiFactorAuthIcon,
          disabled: true,
        },
        {
          title: 'Hosted Pages',
          path: '/management/hosted_pages',
          Icon: HostedPagesIcon,
          disabled: true,
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

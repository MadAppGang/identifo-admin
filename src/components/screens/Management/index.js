import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';
import UsersSection from './sections/Users';
import DatabaseSection from './sections/Database';
import ApplicationsSection from './sections/Applications';
import AccountSection from './sections/Account';
import ServerSection from './sections/Server';
import ExternalServicesSection from './sections/ExternalServices';
import LoginTypesSection from './sections/LoginTypes';
import MultiFactorAuthSection from './sections/MultiFactorAuth';
import HostedPagesSection from './sections/HostedPages';
import NotFoundSection from './sections/404';
import StaticFilesSection from './sections/StaticFiles';
import Container from '~/components/shared/Container';
import { NotificationContainer } from '~/components/shared/Notifications';
import './Management.css';

const ManagementScreen = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Container>
          <Sidebar />
          <Switch>
            <Route exact path="/management" component={ServerSection} />
            <Route path="/management/users" component={UsersSection} />
            <Route path="/management/database" component={DatabaseSection} />
            <Route path="/management/applications" component={ApplicationsSection} />
            <Route path="/management/email_integration" component={ExternalServicesSection} />
            <Route path="/management/account" component={AccountSection} />
            <Route path="/management/settings" component={LoginTypesSection} />
            <Route path="/management/multi-factor_auth" component={MultiFactorAuthSection} />
            <Route path="/management/static" component={StaticFilesSection} />
            <Route path="/management/hosted_pages" component={HostedPagesSection} />
            <Route component={NotFoundSection} />
          </Switch>
        </Container>
        <NotificationContainer />
      </Content>
    </Layout>
  );
};

export default ManagementScreen;

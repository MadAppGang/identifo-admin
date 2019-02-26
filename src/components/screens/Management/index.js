import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';
import UsersSection from './sections/Users';
import DatabaseSection from './sections/Database';
import ApplicationsSection from './sections/Applications';
import SettingsSection from './sections/Settings';
import GettingStartedSection from './sections/GettingStarted';
import EmailIntegrationSection from './sections/EmailIntegration';
import OpenIDSection from './sections/OpenID';
import SocialLoginSection from './sections/SocialLogin';
import MultiFactorAuthSection from './sections/MultiFactorAuth';
import PasswordlessLoginSection from './sections/PassworldlessLogin';
import HostedPagesSection from './sections/HostedPages';
import NotFoundSection from './sections/404';
import Container from '~/components/shared/Container';
import './Management.css';

const ManagementScreen = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Container>
          <Sidebar />
          <Switch>
            <Route exact path="/management" component={GettingStartedSection} />
            <Route path="/management/users" component={UsersSection} />
            <Route path="/management/database" component={DatabaseSection} />
            <Route path="/management/applications" component={ApplicationsSection} />
            <Route path="/management/email_integration" component={EmailIntegrationSection} />
            <Route path="/management/settings" component={SettingsSection} />
            <Route path="/management/openid" component={OpenIDSection} />
            <Route path="/management/social_login" component={SocialLoginSection} />
            <Route path="/management/multi-factor_auth" component={MultiFactorAuthSection} />
            <Route path="/management/passwordless_login" component={PasswordlessLoginSection} />
            <Route path="/management/hosted_pages" component={HostedPagesSection} />
            <Route component={NotFoundSection} />
          </Switch>
        </Container>
      </Content>
    </Layout>
  );
};

export default ManagementScreen;

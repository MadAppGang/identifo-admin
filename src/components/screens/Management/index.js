import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';
import UsersSection from './UsersSection';
import Container from '~/components/shared/Container';

const ManagementScreen = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Container>
          <Sidebar />
          <Switch>
            <Route path="/management/users" component={UsersSection} />
          </Switch>
        </Container>
      </Content>
    </Layout>
  );
};

export default ManagementScreen;

import React from 'react';
import Layout from './Layout';
import Header from './Header';
import Content from './Content';
import Sidebar from './Sidebar';
import Container from '~/components/shared/Container';

const ManagementScreen = () => {
  return (
    <Layout>
      <Header />
      <Content>
        <Container>
          <Sidebar />
        </Container>
      </Content>
    </Layout>
  );
};

export default ManagementScreen;

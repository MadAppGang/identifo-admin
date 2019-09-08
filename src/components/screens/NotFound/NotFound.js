import React from 'react';
import Header from '../Management/Header';
import Content from '../Management/Content';
import Container from '~/components/shared/Container';
import NotFound from '~/components/shared/NotFound';

const NotFoundScreen = () => (
  <div>
    <Header />
    <Content>
      <Container>
        <div className="iap-global-not-found-screen">
          <NotFound />
        </div>
      </Container>
    </Content>
  </div>
);

export default NotFoundScreen;

import React from 'react';
import Header from '../Management/Header';
import Content from '../Management/Content';
import Container from '~/components/shared/Container';
import FetchFailureIcon from '~/components/icons/FetchFailure';
import './NotFound.css';

const NotFoundScreen = () => (
  <div>
    <Header />
    <Content>
      <Container>
        <div className="iap-404-screen">
          <p className="iap-404-screen__title">404</p>
          <FetchFailureIcon className="iap-placeholder__fetch-failure-icon" />
          <p className="iap-404-screen__subtitle">
            Page not found
          </p>
        </div>
      </Container>
    </Content>
  </div>
);

export default NotFoundScreen;

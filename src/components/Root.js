import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import ManagementScreen from './ManagementScreen';
import NotFoundScreen from './NotFoundScreen';
import ensureAuthState, { SIGNED_IN, SIGNED_OUT } from './ensureAuthState';

import './Root.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter basename={process.env.BASE_URL}>
      <Switch>
        <Route
          exact
          path="/"
          component={ensureAuthState(SIGNED_OUT, LoginScreen, '/management')}
        />
        <Route
          path="/management/:section?"
          component={ensureAuthState(SIGNED_IN, ManagementScreen, '/')}
        />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default Root;

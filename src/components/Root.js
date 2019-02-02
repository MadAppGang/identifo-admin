import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/Login';
import ManagementScreen from './screens/Management';
import ensureAuthState, { SIGNED_IN, SIGNED_OUT } from './hoc/ensureAuthState';

import './index.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
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
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default Root;

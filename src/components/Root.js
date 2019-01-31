import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from './screens/Login';
import ManagementScreen from './screens/Management';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginScreen} />
        <Route path="/management/:section?" component={ManagementScreen} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default Root;

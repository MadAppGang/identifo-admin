import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const App = ({ store, history }) => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        Hello, world!
      </div>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default App;

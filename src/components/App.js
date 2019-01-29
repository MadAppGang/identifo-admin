import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <div>
      Hello, world!
    </div>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default App;

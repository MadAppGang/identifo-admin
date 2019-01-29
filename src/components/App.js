import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        Hello, world!
      </div>
    </BrowserRouter>
  </Provider>
);

App.propTypes = {
  store: PropTypes.shape().isRequired,
};

export default App;

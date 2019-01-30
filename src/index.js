import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import services from './services';
import configureStore from './modules';

const store = configureStore(services);

const markup = (
  <App store={store} />
);

ReactDOM.render(markup, document.getElementById('root'));

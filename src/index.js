import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import services from './services';
import configureStore from './modules';

import './index.css';

const store = configureStore(services);

const markup = (
  <Root store={store} />
);

ReactDOM.render(markup, document.getElementById('root'));

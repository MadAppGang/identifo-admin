import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import services from './services';
import configureStore from './modules';

const store = configureStore(services);

services.applications.fetchApplications().then(console.log)

const markup = (
  <Root store={store} />
);

ReactDOM.render(markup, document.getElementById('root'));

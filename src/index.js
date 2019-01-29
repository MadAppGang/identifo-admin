import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import App from './components/App';
import configureStore from './modules/store';
import services from './services';

const markup = (
  <App
    history={createHistory()}
    store={configureStore(services)}
  />
);

ReactDOM.render(markup, document.getElementById('root'));

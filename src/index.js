import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import rootReducer from './modules/root';
import App from './components/App';

const store = createStore(rootReducer);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

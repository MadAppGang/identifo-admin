import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import databaseReducer from './database/reducer';
import configureStore from './store';
import { curry } from '../utils/fn';

const rootReducer = combineReducers({
  auth: authReducer,
  database: databaseReducer,
});

export default curry(configureStore, rootReducer);

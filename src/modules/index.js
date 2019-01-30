import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import configureStore from './store';
import { curry } from '../utils/fn';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default curry(configureStore, rootReducer);

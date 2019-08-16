import update from '@madappgang/update-by-path';
import {
  RECEIVE_LOGIN_SETTINGS, 
  RECEIVE_EXTERNAL_SETTINGS,
  RECEIVE_SESSION_STORAGE_SETTINGS,
  RECEIVE_STATIC_FILES_SETTINGS,
  RECEIVE_GENERAL_SETTINGS,
} from './types';

const INITIAL_STATE = {
  login: {
    loginWith: {
      username: false,
      federated: false,
      phone: false,
    },
    tfaType: 'app',
  },
  externalServices: null,
  sessionStorage: null,
  staticFiles: null,
  general: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RECEIVE_LOGIN_SETTINGS:
      return update(state, 'login', payload);
    case RECEIVE_EXTERNAL_SETTINGS:
      return update(state, 'externalServices', payload);
    case RECEIVE_SESSION_STORAGE_SETTINGS:
      return update(state, 'sessionStorage', payload);
    case RECEIVE_STATIC_FILES_SETTINGS:
      return update(state, 'staticFiles', payload);
    case RECEIVE_GENERAL_SETTINGS:
      return update(state, 'general', payload);
    default:
      return state;
  }
};

export default reducer;

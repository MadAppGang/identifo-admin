import update from '@madappgang/update-by-path';
import { RECEIVE_LOGIN_SETTINGS, RECEIVE_EXTERNAL_SETTINGS } from './types';

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
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case RECEIVE_LOGIN_SETTINGS:
      return update(state, 'login', payload);
    case RECEIVE_EXTERNAL_SETTINGS:
      return update(state, 'externalServices', payload);
    default:
      return state;
  }
};

export default reducer;

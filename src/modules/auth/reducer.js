import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  authenticated: false,
  signingIn: false,
  signingOut: false,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_ATTEMPT:
      return update(state, 'signingIn', true);
    case types.LOGIN_SUCCESS:
      return update(state, {
        authenticated: true,
        signingIn: false,
        error: null,
      });
    case types.LOGIN_FAILURE:
      return update(state, {
        signingIn: false,
        error: payload,
      });
    case types.LOGOUT_ATTEMPT:
      return update(state, 'signingOut', true);
    case types.LOGOUT_SUCCESS:
      return update(state, {
        signingOut: false,
        authenticated: false,
      });
    default:
      return state;
  }
};

export default reducer;

import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  saving: false,
  application: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.POST_APPLICATION_ATTEMPT:
      return update(state, {
        saving: true,
        application: null,
      });
    case types.POST_APPLICATION_SUCCESS:
      return update(state, {
        saving: false,
        application: payload,
      });
    case types.POST_APPLICATION_FAILURE:
      return update(state, {
        saving: false,
        error: payload,
      });
    case types.DELETE_APPLICATION_ATTEMPT:
      return update(state, {
        saving: true,
      });
    case types.DELETE_APPLICATION_SUCCESS:
      return update(state, {
        saving: false,
      });
    case types.DELETE_APPLICATION_FAILURE:
      return update(state, {
        saving: false,
        error: payload,
      });
    default:
      return state;
  }
};

export default reducer;

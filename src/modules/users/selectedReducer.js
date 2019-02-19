import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  user: null,
  error: null,
  fetching: false,
  saving: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_USER_BY_ID_ATTEMPT:
      return update(state, {
        fetching: true,
        user: null,
      });
    case types.FETCH_USER_BY_ID_SUCCESS:
      return update(state, {
        fetching: false,
        user: payload,
      });
    case types.FETCH_USER_BY_ID_FAILURE:
      return update(state, {
        fetching: false,
        error: payload,
      });
    default:
      return state;
  }
};


export default reducer;

import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  list: [],
  error: null,
  fetching: false,
  saving: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_USERS_ATTEMPT:
      return update(state, {
        fetching: true,
      });
    case types.FETCH_USERS_SUCCESS:
      return update(state, {
        fetching: false,
        list: payload,
      });
    case types.FETCH_USERS_FAILURE:
      return update(state, {
        fetching: false,
        error: payload,
      });
    case types.POST_USER_ATTEMPT:
      return update(state, {
        saving: true,
      });
    case types.POST_USER_SUCCESS:
      return update(state, {
        saving: false,
        list: list => list.concat(payload),
      });
    case types.POST_USER_FAILURE:
      return update(state, {
        saving: false,
        error: payload,
      });
    case types.ALTER_USER_ATTEMPT:
      return update(state, {
        saving: true,
      });
    case types.ALTER_USER_SUCCESS:
      return update(state, {
        saving: false,
        [`list[id=${payload.id}]`]: payload,
      });
    case types.ALTER_USER_FAILURE:
      return update(state, {
        saving: false,
        error: payload,
      });
    default:
      return state;
  }
};

export default reducer;

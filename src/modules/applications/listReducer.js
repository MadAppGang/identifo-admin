import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  fetching: false,
  list: [],
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.FETCH_APPLICATIONS_ATTEMPT:
      return update(state, {
        saving: true,
      });
    case types.FETCH_APPLICATIONS_SUCCESS:
      return update(state, {
        saving: false,
        list: payload,
      });
    case types.FETCH_APPLICATIONS_FAILURE:
      return update(state, {
        saving: false,
        error: payload,
      });
    default:
      return state;
  }
};

export default reducer;

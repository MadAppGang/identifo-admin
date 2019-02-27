import update from '@madappgang/update-by-path';
import types from './types';

const INITIAL_STATE = {
  list: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.CREATE_NOTIFICATION:
      return update(state, {
        list: list => list.concat(payload),
      });
    case types.REMOVE_NOTIFICATION:
      return update(state, {
        list: list => list.filter(n => n.id !== payload),
      });
    default:
      return state;
  }
};

export default reducer;

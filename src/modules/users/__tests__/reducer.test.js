import reducer from '../reducer';
import types from '../types';

describe('users module reducer', () => {
  test('sets fetching to true on fetch attempt', () => {
    const action = { type: types.FETCH_USERS_ATTEMPT };
    expect(reducer(undefined, action).fetching).toBe(true);
  });

  test('sets fetching to false on fetch success', () => {
    const action = { type: types.FETCH_USERS_SUCCESS };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets fetching to false on fetch failure', () => {
    const action = { type: types.FETCH_USERS_FAILURE };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets list to payload on fetch success', () => {
    const users = [];
    const action = { type: types.FETCH_USERS_SUCCESS, payload: users };
    expect(reducer(undefined, action).list).toBe(users);
  });

  test('sets error to payload on fetch failure', () => {
    const err = new Error('error');
    const action = { type: types.FETCH_USERS_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });
});

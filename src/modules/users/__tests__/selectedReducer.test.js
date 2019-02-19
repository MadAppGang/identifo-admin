import reducer from '../selectedReducer';
import types from '../types';

describe('users module "selectedUser" reducer', () => {
  test('sets fetching to true on fetch attempt', () => {
    const action = { type: types.FETCH_USER_BY_ID_ATTEMPT };
    expect(reducer(undefined, action).fetching).toBe(true);
  });

  test('sets fetching to false on fetch success', () => {
    const action = { type: types.FETCH_USER_BY_ID_SUCCESS };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets fetching to false on fetch failure', () => {
    const action = { type: types.FETCH_USER_BY_ID_FAILURE };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets user to payload on fetch success', () => {
    const user = {};
    const action = { type: types.FETCH_USER_BY_ID_SUCCESS, payload: user };
    expect(reducer(undefined, action).user).toBe(user);
  });

  test('sets error to payload on fetch failure', () => {
    const err = {};
    const action = { type: types.FETCH_USER_BY_ID_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });

  test('sets user to null on fetch attempt', () => {
    const action = { type: types.FETCH_USER_BY_ID_ATTEMPT };
    expect(reducer({ user: {} }, action).user).toBe(null);
  });

  test('sets saving to true on alter attempt', () => {
    const action = { type: types.ALTER_USER_ATTEMPT };
    expect(reducer(undefined, action).saving).toBe(true);
  });

  test('sets saving to false on alter success', () => {
    const user = { id: '1' };
    const action = { type: types.ALTER_USER_SUCCESS, payload: user };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets saving to false on alter failure', () => {
    const action = { type: types.ALTER_USER_FAILURE };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets user to payload on alteration success', () => {
    const user = {};
    const action = { type: types.ALTER_USER_SUCCESS, payload: user };
    expect(reducer(undefined, action).user).toEqual(user);
  });
});

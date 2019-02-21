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

  test('sets saving to true on delete attempt', () => {
    const action = { type: types.DELETE_USER_BY_ID_ATTEMPT };
    expect(reducer(undefined, action).saving).toBe(true);
  });

  test('sets saving to false on delete success', () => {
    const action = { type: types.DELETE_USER_BY_ID_SUCCESS };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets saving to false on delete failure', () => {
    const action = { type: types.DELETE_USER_BY_ID_FAILURE };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets error to payload on delete failure', () => {
    const err = {};
    const action = { type: types.DELETE_USER_BY_ID_FAILURE, payload: err };
    expect(reducer({ saving: true }, action).error).toBe(err);
  });

  test('sets saving to true on post attempt', () => {
    const action = { type: types.POST_USER_ATTEMPT };
    expect(reducer(undefined, action).saving).toBe(true);
  });

  test('sets saving to false on post success', () => {
    const action = { type: types.POST_USER_SUCCESS };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets saving to false on post failure', () => {
    const action = { type: types.POST_USER_FAILURE };
    expect(reducer(undefined, action).saving).toBe(false);
  });

  test('sets user to paylooad on post success', () => {
    const user = {};
    const action = { type: types.POST_USER_SUCCESS, payload: user };
    const state = {
      saving: true,
      user: null,
      error: null,
    };
    const expectedState = {
      saving: false,
      error: null,
      user,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('error');
    const action = { type: types.POST_USER_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });
});

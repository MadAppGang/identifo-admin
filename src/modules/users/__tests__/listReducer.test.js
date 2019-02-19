import reducer from '../listReducer';
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

  test('sets payload to the end of the list on post success', () => {
    const user = {};
    const action = { type: types.POST_USER_SUCCESS, payload: user };
    const state = {
      saving: true,
      list: [],
      error: null,
    };
    const expectedState = {
      saving: false,
      list: [user],
      error: null,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('error');
    const action = { type: types.POST_USER_FAILURE, payload: err };
    expect(reducer(undefined, action).error).toBe(err);
  });

  test('removes user with passed id from list on delete success', () => {
    const list = [{ id: '1' }, { id: '2' }];
    const action = { type: types.DELETE_USER_BY_ID_SUCCESS, payload: '2' };
    expect(reducer({ list }, action).list).not.toContain({ id: '2' });
  });
});

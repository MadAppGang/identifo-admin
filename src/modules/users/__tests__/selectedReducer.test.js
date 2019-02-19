import reducer from '../selectedReducer';
import types from '../types';

describe('users module "selectedUser" reducer', () => {
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

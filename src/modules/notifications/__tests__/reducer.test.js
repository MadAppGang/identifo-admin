import reducer from '../reducer';
import types from '../types';

describe('notification reducer', () => {
  test('reducer is a function', () => {
    expect(reducer).toBeInstanceOf(Function);
  });

  test('initial state is not undefined', () => {
    expect(reducer(undefined, {})).not.toBe(undefined);
  });

  test('notification list is empty by default', () => {
    expect(reducer(undefined, {}).list).toHaveLength(0);
  });

  test('appends notification to the list on create action', () => {
    const notification = {};
    const action = {
      type: types.CREATE_NOTIFICATION,
      payload: notification,
    };
    const expectedState = {
      list: [notification],
    };
    const state = reducer(undefined, action);

    expect(state).toEqual(expectedState);
  });

  test('removes notification by id', () => {
    const notification = { id: 1 };
    const initialState = { list: [notification] };
    const expectedState = { list: [] };
    const action = {
      type: types.REMOVE_NOTIFICATION,
      payload: notification.id,
    };
    const state = reducer(initialState, action);

    expect(state).toEqual(expectedState);
  });
});

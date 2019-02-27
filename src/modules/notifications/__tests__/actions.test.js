import { createNotification, removeNotification } from '../actions';
import types from '../types';

describe('create notification action creator', () => {
  test('is a function', () => {
    expect(createNotification).toBeInstanceOf(Function);
  });

  test('dispatches a create notification action', () => {
    expect(createNotification()).toEqual({ type: types.CREATE_NOTIFICATION });
  });
});

describe('remove notification action creator', () => {
  test('is a function', () => {
    expect(removeNotification).toBeInstanceOf(Function);
  });

  test('dispatches remove action', () => {
    const id = 1;
    const action = removeNotification(id);
    const expectedAction = {
      type: types.REMOVE_NOTIFICATION,
      payload: id,
    };
    expect(action).toEqual(expectedAction);
  });
});

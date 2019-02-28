import { createNotification, removeNotification } from '../actions';
import types from '../types';

describe('create notification action creator', () => {
  test('is a function', () => {
    expect(createNotification).toBeInstanceOf(Function);
  });

  test('dispatches a create notification action', () => {
    expect(createNotification().type).toEqual(types.CREATE_NOTIFICATION);
  });

  test('created action contains an id', () => {
    expect(createNotification().payload.id).not.toBe(undefined);
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

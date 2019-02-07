import reducer from '../reducer';
import types from '../types';

describe('database reducer', () => {
  test('sets fetching to true on fetch attempt', () => {
    const action = {
      type: types.FETCH_DB_SETTINGS_ATTEMPT,
    };
    expect(reducer(undefined, action).fetching).toBe(true);
  });

  test('sets fetching to false on fetch success', () => {
    const action = {
      type: types.FETCH_DB_SETTINGS_SUCCESS,
    };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets settings to payload on fetch success', () => {
    const settings = {};
    const action = {
      type: types.FETCH_DB_SETTINGS_SUCCESS,
      payload: settings,
    };
    expect(reducer(undefined, action).settings).toBe(settings);
  });

  test('sets posting to true on post attempt', () => {
    const action = {
      type: types.POST_DB_SETTINGS_ATTEMPT,
    };
    expect(reducer(undefined, action).posting).toBe(true);
  });

  test('sets posting to false on post success', () => {
    const action = {
      type: types.POST_DB_SETTINGS_SUCCESS,
    };
    expect(reducer(undefined, action).posting).toBe(false);
  });

  test('sets error to payload on fetch failure', () => {
    const err = new Error('msg');
    const action = {
      type: types.FETCH_DB_SETTINGS_FAILURE,
      payload: err,
    };
    expect(reducer(undefined, action).error).toBe(err);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('msg');
    const action = {
      type: types.POST_DB_SETTINGS_FAILURE,
      payload: err,
    };
    expect(reducer(undefined, action).error).toBe(err);
  });
});

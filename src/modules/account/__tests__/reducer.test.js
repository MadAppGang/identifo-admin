import reducer from '../reducer';
import types from '../types';

describe('account module reducer', () => {
  test('sets fetching to true on fetch attempt', () => {
    const action = {
      type: types.FETCH_ACCOUNT_SETTINGS_ATTEMPT,
    };
    expect(reducer(undefined, action).fetching).toBe(true);
  });

  test('sets fetching to false on fetch success', () => {
    const action = {
      type: types.FETCH_ACCOUNT_SETTINGS_SUCCESS,
    };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets fetching to false on fetch failure', () => {
    const action = {
      type: types.FETCH_ACCOUNT_SETTINGS_FAILURE,
    };
    expect(reducer(undefined, action).fetching).toBe(false);
  });

  test('sets settings to payload on fetch success', () => {
    const settings = {};
    const action = {
      type: types.FETCH_ACCOUNT_SETTINGS_SUCCESS,
      payload: settings,
    };
    expect(reducer(undefined, action).settings).toBe(settings);
  });

  test('sets posting to true on post attempt', () => {
    const action = {
      type: types.POST_ACCOUNT_SETTINGS_ATTEMPT,
    };
    expect(reducer(undefined, action).posting).toBe(true);
  });

  test('sets posting to false on post success', () => {
    const action = {
      type: types.POST_ACCOUNT_SETTINGS_SUCCESS,
    };
    expect(reducer(undefined, action).posting).toBe(false);
  });

  test('sets posting to false on post failure', () => {
    const action = {
      type: types.POST_ACCOUNT_SETTINGS_FAILURE,
    };
    expect(reducer(undefined, action).posting).toBe(false);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('errmsg');
    const action = {
      type: types.POST_ACCOUNT_SETTINGS_FAILURE,
      payload: err,
    };
    expect(reducer(undefined, action).error).toBe(err);
  });
});

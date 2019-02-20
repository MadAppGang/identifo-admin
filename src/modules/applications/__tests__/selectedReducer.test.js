import reducer from '../selectedReducer';
import types from '../types';

describe('[applications] selected reducer', () => {
  test('sets saving to true on post attempt', () => {
    const action = { type: types.POST_APPLICATION_ATTEMPT };
    expect(reducer({ saving: false }, action).saving).toBe(true);
  });

  test('sets saving to false on post success', () => {
    const action = { type: types.POST_APPLICATION_SUCCESS };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets saving to false on post failure', () => {
    const action = { type: types.POST_APPLICATION_FAILURE };
    expect(reducer({ saving: true }, action).saving).toBe(false);
  });

  test('sets application to payload on post success', () => {
    const payload = { id: '1234' };
    const action = { type: types.POST_APPLICATION_SUCCESS, payload };
    expect(reducer({ applicatoin: null }, action).application).toEqual(payload);
  });

  test('sets error to payload on post failure', () => {
    const err = new Error('message');
    const action = { type: types.POST_APPLICATION_FAILURE, payload: err };
    expect(reducer({ error: null }, action).error).toEqual(err);
  });
});

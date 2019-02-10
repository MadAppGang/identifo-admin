import { fetchAccountSettings } from '../actions';
import types from '../types';

describe('[account module] fetchAccountSettings action', () => {
  let dispatch;
  let account;

  beforeEach(() => {
    account = {
      fetchSettings: jest.fn(),
    };
    dispatch = jest.fn();
  });

  test('is a function', () => {
    expect(fetchAccountSettings).toBeInstanceOf(Function);
  });

  test('returns a function', () => {
    expect(fetchAccountSettings()).toBeInstanceOf(Function);
  });

  test('dispatches attempt', () => {
    const expectedAction = {
      type: types.FETCH_ACCOUNT_SETTINGS_ATTEMPT,
    };

    fetchAccountSettings()(dispatch, null, { account });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('dispatches success second time on successful service response', async () => {
    const settings = {};
    const expectedAction = {
      type: types.FETCH_ACCOUNT_SETTINGS_SUCCESS,
      payload: settings,
    };
    account.fetchSettings.mockReturnValue(Promise.resolve(settings));

    await fetchAccountSettings()(dispatch, null, { account });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('dispatches failure second time on failed service response', async () => {
    const err = new Error('errmsg');
    const expectedAction = {
      type: types.FETCH_ACCOUNT_SETTINGS_FAILURE,
      payload: err,
    };
    account.fetchSettings.mockReturnValue(Promise.reject(err));

    await fetchAccountSettings()(dispatch, null, { account });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('invokes fetchSettings service method', () => {
    fetchAccountSettings()(dispatch, null, { account });
    expect(account.fetchSettings).toBeCalled();
  });
});

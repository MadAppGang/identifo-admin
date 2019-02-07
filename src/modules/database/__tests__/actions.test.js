import types from '../types';
import { testConnection, fetchSettings, postSettings } from '../actions';

describe('database actions', () => {
  let dispatch;
  let database;

  beforeEach(() => {
    dispatch = jest.fn();
    database = {
      testConnection: jest.fn(),
      fetchSettings: jest.fn(),
      postSettings: jest.fn(),
    };
  });

  test('test connection dispatches attempt', () => {
    const expectedAction = {
      type: types.TEST_CONNECTION_ATTEMPT,
    };

    testConnection()(dispatch, null, { database });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('test connection dispatches success on successful test', async () => {
    const expectedAction = {
      type: types.TEST_CONNECTION_SUCCESS,
    };

    const settings = {
      type: 'mongodb',
    };

    await testConnection(settings)(dispatch, null, { database });

    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('test connection dispatches failure on failed test', async () => {
    const err = new Error('error message');

    const expectedAction = {
      type: types.TEST_CONNECTION_FAILURE,
      payload: err,
    };

    const settings = {
      type: 'dynamodb',
    };

    database.testConnection.mockReturnValue(Promise.reject(err));

    await testConnection(settings)(dispatch, null, { database });

    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('test connection invokes database test connection method', () => {
    const settings = { type: 'mongodb' };

    testConnection(settings)(dispatch, null, { database });
    expect(database.testConnection).toBeCalledWith(settings);
  });

  test('fetch settings dispatches attempt', () => {
    const expectedAction = {
      type: types.FETCH_DB_SETTINGS_ATTEMPT,
    };

    fetchSettings()(dispatch, null, { database });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('fetch settings dispatches success on successfuly fetch', async () => {
    const settings = {
      type: 'mongodb',
    };

    const expectedAction = {
      type: types.FETCH_DB_SETTINGS_SUCCESS,
      payload: settings,
    };

    database.fetchSettings.mockReturnValue(Promise.resolve(settings));

    await fetchSettings()(dispatch, null, { database });

    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('fetch settings dispatches failure on rejected fetch', async () => {
    const err = new Error('error message');
    const expectedAction = {
      type: types.FETCH_DB_SETTINGS_FAILURE,
      payload: err,
    };

    database.fetchSettings.mockReturnValue(Promise.reject(err));

    await fetchSettings()(dispatch, null, { database });

    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('fetch settings invokes database service fetch settings method', () => {
    fetchSettings()(dispatch, null, { database });
    expect(database.fetchSettings).toBeCalled();
  });

  test('post settings dispatches attempt', () => {
    const expectedAction = {
      type: types.POST_DB_SETTINGS_ATTEMPT,
    };

    postSettings()(dispatch, null, { database });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('post settings dispatches success on successful post', async () => {
    const expectedAction = {
      type: types.POST_DB_SETTINGS_SUCCESS,
    };

    await postSettings()(dispatch, null, { database });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('post settings dispatches failure on rejected post', async () => {
    const err = new Error('error message');
    const expectedAction = {
      type: types.POST_DB_SETTINGS_FAILURE,
      payload: err,
    };

    database.postSettings.mockReturnValue(Promise.reject(err));

    await postSettings()(dispatch, null, { database });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('post settings invokes post database service method', () => {
    const settings = { type: 'mongodb' };

    postSettings(settings)(dispatch, null, { database });
    expect(database.postSettings).toBeCalledWith(settings);
  });
});

import types from '../types';
import { testConnection } from '../actions';

describe('database actions', () => {
  let dispatch;
  let database;

  beforeEach(() => {
    dispatch = jest.fn();
    database = {
      testConnection: jest.fn(),
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
});

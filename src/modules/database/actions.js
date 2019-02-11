import actionCreator from '@madappgang/action-creator';
import types from './types';

const testConnectionAttempt = actionCreator(types.TEST_CONNECTION_ATTEMPT);
const testConnectionSuccess = actionCreator(types.TEST_CONNECTION_SUCCESS);
const testConnectionFailure = actionCreator(types.TEST_CONNECTION_FAILURE);

const fetchSettingsAttempt = actionCreator(types.FETCH_DB_SETTINGS_ATTEMPT);
const fetchSettingsSuccess = actionCreator(types.FETCH_DB_SETTINGS_SUCCESS);
const fetchSettingsFailure = actionCreator(types.FETCH_DB_SETTINGS_FAILURE);

const postSettingsAttempt = actionCreator(types.POST_DB_SETTINGS_ATTEMPT);
const postSettingsSuccess = actionCreator(types.POST_DB_SETTINGS_SUCCESS);
const postSettingsFailure = actionCreator(types.POST_DB_SETTINGS_FAILURE);

const testConnection = settings => async (dispatch, _, { database: dbService }) => {
  dispatch(testConnectionAttempt());

  try {
    await dbService.testConnection(settings);
    dispatch(testConnectionSuccess());
  } catch (err) {
    dispatch(testConnectionFailure(err));
  }
};

const fetchSettings = () => async (dispatch, _, { database: dbService }) => {
  dispatch(fetchSettingsAttempt());

  try {
    const settings = await dbService.fetchSettings();
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    dispatch(fetchSettingsFailure(err));
  }
};

const postSettings = settings => async (dispatch, _, { database: dbService }) => {
  dispatch(postSettingsAttempt());

  try {
    await dbService.postSettings(settings);
    dispatch(postSettingsSuccess(settings));
  } catch (err) {
    dispatch(postSettingsFailure(err));
  }
};

export {
  testConnection,
  fetchSettings,
  postSettings,
};

import actionCreator from '@madappgang/action-creator';
import types from './types';
import { getError } from '~/utils';

const testConnectionAttempt = actionCreator(types.TEST_CONNECTION_ATTEMPT);
const testConnectionSuccess = actionCreator(types.TEST_CONNECTION_SUCCESS);
const testConnectionFailure = actionCreator(types.TEST_CONNECTION_FAILURE);

const fetchSettingsAttempt = actionCreator(types.FETCH_DB_SETTINGS_ATTEMPT);
const fetchSettingsSuccess = actionCreator(types.FETCH_DB_SETTINGS_SUCCESS);
const fetchSettingsFailure = actionCreator(types.FETCH_DB_SETTINGS_FAILURE);

const postSettingsAttempt = actionCreator(types.POST_DB_SETTINGS_ATTEMPT);
const postSettingsSuccess = actionCreator(types.POST_DB_SETTINGS_SUCCESS);
const postSettingsFailure = actionCreator(types.POST_DB_SETTINGS_FAILURE);

const testConnection = () => async (dispatch, getState, { database: dbService }) => {
  dispatch(testConnectionAttempt());

  try {
    await dbService.testConnection(getState().database.settings.config);
    dispatch(testConnectionSuccess());
  } catch (err) {
    dispatch(testConnectionFailure(getError(err)));
  }
};

const fetchSettings = () => async (dispatch, _, { database: dbService }) => {
  dispatch(fetchSettingsAttempt());

  try {
    const settings = await dbService.fetchSettings();
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    dispatch(fetchSettingsFailure(getError(err)));
  }
};

const postSettings = settings => async (dispatch, _, { database: dbService }) => {
  dispatch(postSettingsAttempt());

  try {
    await dbService.postSettings(settings);
    dispatch(postSettingsSuccess(settings));
  } catch (err) {
    dispatch(postSettingsFailure(getError(err)));
  }
};

const resetError = actionCreator(types.RESET_DB_SETTINGS_ERROR);

export {
  testConnection,
  fetchSettings,
  postSettings,
  resetError,
};

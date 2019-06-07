import actionCreator from '@madappgang/action-creator';
import { getError, getStatus } from '~/utils';
import types from './types';
import { logout } from '../auth/actions';

const testConnectionAttempt = actionCreator(types.TEST_CONNECTION_ATTEMPT);
const testConnectionSuccess = actionCreator(types.TEST_CONNECTION_SUCCESS);
const testConnectionFailure = actionCreator(types.TEST_CONNECTION_FAILURE);

const fetchSettingsAttempt = actionCreator(types.FETCH_DB_SETTINGS_ATTEMPT);
const fetchSettingsSuccess = actionCreator(types.FETCH_DB_SETTINGS_SUCCESS);
const fetchSettingsFailure = actionCreator(types.FETCH_DB_SETTINGS_FAILURE);

const postSettingsAttempt = actionCreator(types.POST_DB_SETTINGS_ATTEMPT);
const postSettingsSuccess = actionCreator(types.POST_DB_SETTINGS_SUCCESS);
const postSettingsFailure = actionCreator(types.POST_DB_SETTINGS_FAILURE);

const UNAUTHORIZED = 401;

const testConnection = () => async (dispatch, getState, services) => {
  dispatch(testConnectionAttempt());

  try {
    await services.database.testConnection(getState().database.settings.config);
    dispatch(testConnectionSuccess());
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, getState, services);
      return;
    }

    dispatch(testConnectionFailure(getError(err)));
  }
};

const fetchSettings = () => async (dispatch, _, services) => {
  dispatch(fetchSettingsAttempt());

  try {
    const settings = await services.database.fetchSettings();
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(fetchSettingsFailure(getError(err)));
  }
};

const postSettings = settings => async (dispatch, _, services) => {
  dispatch(postSettingsAttempt());

  try {
    await services.database.postSettings(settings);
    dispatch(postSettingsSuccess(settings));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

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

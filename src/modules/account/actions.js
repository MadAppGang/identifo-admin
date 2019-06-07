import actionCreator from '@madappgang/action-creator';
import { getError, getStatus } from '~/utils';
import types from './types';
import { logout } from '../auth/actions';

const fetchSettingsAttempt = actionCreator(types.FETCH_ACCOUNT_SETTINGS_ATTEMPT);
const fetchSettingsSuccess = actionCreator(types.FETCH_ACCOUNT_SETTINGS_SUCCESS);
const fetchSettingsFailure = actionCreator(types.FETCH_ACCOUNT_SETTINGS_FAILURE);

const postSettingsAttempt = actionCreator(types.POST_ACCOUNT_SETTINGS_ATTEMPT);
const postSettingsSuccess = actionCreator(types.POST_ACCOUNT_SETTINGS_SUCCESS);
const postSettingsFailure = actionCreator(types.POST_ACCOUNT_SETTINGS_FAILURE);

const UNAUTHORIZED = 401;

const fetchAccountSettings = () => async (dispatch, _, services) => {
  dispatch(fetchSettingsAttempt());

  try {
    const settings = await services.account.fetchSettings();
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
    }

    dispatch(fetchSettingsFailure(getError(err)));
  }
};

const postAccountSettings = settings => async (dispatch, _, services) => {
  dispatch(postSettingsAttempt());

  try {
    await services.account.postSettings(settings);
    dispatch(postSettingsSuccess(settings));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
    }

    dispatch(postSettingsFailure(getError(err)));
  }
};

const resetAccountError = actionCreator(types.RESET_ACCOUNT_ERROR);

export {
  fetchAccountSettings,
  postAccountSettings,
  resetAccountError,
};

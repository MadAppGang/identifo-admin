import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchSettingsAttempt = actionCreator(types.FETCH_ACCOUNT_SETTINGS_ATTEMPT);
const fetchSettingsSuccess = actionCreator(types.FETCH_ACCOUNT_SETTINGS_SUCCESS);
const fetchSettingsFailure = actionCreator(types.FETCH_ACCOUNT_SETTINGS_FAILURE);

const postSettingsAttempt = actionCreator(types.POST_ACCOUNT_SETTINGS_ATTEMPT);
const postSettingsSuccess = actionCreator(types.POST_ACCOUNT_SETTINGS_SUCCESS);
const postSettingsFailure = actionCreator(types.POST_ACCOUNT_SETTINGS_FAILURE);

const fetchAccountSettings = () => async (dispatch, _, { account }) => {
  dispatch(fetchSettingsAttempt());

  try {
    const settings = await account.fetchSettings();
    dispatch(fetchSettingsSuccess(settings));
  } catch (err) {
    dispatch(fetchSettingsFailure(err));
  }
};

const postAccountSettings = settings => async (dispatch, _, { account }) => {
  dispatch(postSettingsAttempt());

  try {
    await account.postSettings(settings);
    dispatch(postSettingsSuccess(settings));
  } catch (err) {
    dispatch(postSettingsFailure(err));
  }
};

const resetAccountError = actionCreator(types.RESET_ACCOUNT_ERROR);

export {
  fetchAccountSettings,
  postAccountSettings,
  resetAccountError,
};

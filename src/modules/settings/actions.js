import { RECEIVE_LOGIN_SETTINGS, RECEIVE_EXTERNAL_SETTINGS } from './types';

export const fetchLoginSettings = () => async (dispatch, _, services) => {
  const settings = await services.settings.fetchLoginSettings();
  dispatch({
    type: RECEIVE_LOGIN_SETTINGS,
    payload: settings,
  });
};

export const updateLoginSettings = settings => async (dispatch, _, services) => {
  await services.settings.updateLoginSettings(settings);
  dispatch({
    type: RECEIVE_LOGIN_SETTINGS,
    payload: settings,
  });
};

export const fetchExternalServicesSettings = () => async (dispatch, _, services) => {
  const settings = await services.settings.fetchExternalServicesSettings();
  dispatch({
    type: RECEIVE_EXTERNAL_SETTINGS,
    payload: settings,
  });
};

export const updateExternalServicesSettings = settings => async (dispatch, _, services) => {
  await services.settings.updateExternalServicesSettings(settings);
  dispatch({
    type: RECEIVE_EXTERNAL_SETTINGS,
    payload: settings,
  });
};

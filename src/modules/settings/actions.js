import {
  RECEIVE_LOGIN_SETTINGS,
  RECEIVE_EXTERNAL_SETTINGS,
  RECEIVE_SESSION_STORAGE_SETTINGS,
  RECEIVE_STATIC_FILES_SETTINGS,
} from './types';

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

export const fetchSessionStorageSettings = () => async (dispatch, _, services) => {
  const settings = await services.settings.fetchSessionStorageSettings();
  dispatch({
    type: RECEIVE_SESSION_STORAGE_SETTINGS,
    payload: settings,
  });
};

export const updateSessionStorageSettings = settings => async (dispatch, _, services) => {
  await services.settings.updateSessionStorageSettings(settings);
  dispatch({
    type: RECEIVE_SESSION_STORAGE_SETTINGS,
    payload: settings,
  });
};

export const fetchStaticFilesSettings = () => async (dispatch, _, services) => {
  const settings = await services.settings.fetchStaticFilesSettings();
  dispatch({
    type: RECEIVE_STATIC_FILES_SETTINGS,
    payload: settings,
  });
};

export const updateStaticFilesSettings = settings => async (dispatch, _, services) => {
  await services.settings.updateStaticFilesSettings(settings);
  dispatch({
    type: RECEIVE_STATIC_FILES_SETTINGS,
    payload: settings,
  });
};

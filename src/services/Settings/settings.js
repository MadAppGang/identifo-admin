import {
  serializeLoginSettings, deserializeLoginSettings,
} from './mappings/loginSettingsMappings';

import {
  serializeExternalServicesSettings, deserializeExternalServicesSettings,
} from './mappings/externalSettingsMapping';

import {
  serializeSessionStorageSettings, deserializeSessionStorageSettings,
} from './mappings/sessionSettingsMappings';

import {
  serializeStaticFilesSettings, deserializeStaticFilesSettings,
} from './mappings/staticFilesSettingsMappings';

import {
  serializeGeneralSettings, deserializeGeneralSettings,
} from './mappings/generalSettingsMappings';

const createSettingsService = ({ httpClient }) => {
  const fetchLoginSettings = async () => {
    const url = `${process.env.API_URL}/settings/login`;
    const { data } = await httpClient.get(url);

    return deserializeLoginSettings(data);
  };

  const updateLoginSettings = (settings) => {
    const url = `${process.env.API_URL}/settings/login`;
    return httpClient.put(url, serializeLoginSettings(settings));
  };

  const fetchExternalServicesSettings = async () => {
    const url = `${process.env.API_URL}/settings/services`;
    const { data } = await httpClient.get(url);

    return deserializeExternalServicesSettings(data);
  };

  const updateExternalServicesSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/services`;
    return httpClient.put(url, serializeExternalServicesSettings(settings));
  };

  const fetchSessionStorageSettings = async () => {
    const url = `${process.env.API_URL}/settings/storage/session`;
    const { data } = await httpClient.get(url);

    return deserializeSessionStorageSettings(data);
  };

  const updateSessionStorageSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/storage/session`;
    return httpClient.put(url, serializeSessionStorageSettings(settings));
  };

  const fetchStaticFilesSettings = async () => {
    const url = `${process.env.API_URL}/settings/static`;
    const { data } = await httpClient.get(url);

    return deserializeStaticFilesSettings(data);
  };

  const updateStaticFilesSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/static`;
    return httpClient.put(url, serializeStaticFilesSettings(settings));
  };

  const fetchGeneralSettings = async () => {
    const url = `${process.env.API_URL}/settings/general`;
    const { data } = await httpClient.get(url);

    return deserializeGeneralSettings(data);
  };

  const updateGeneralSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/general`;
    return httpClient.put(url, serializeGeneralSettings(settings));
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
    fetchExternalServicesSettings,
    updateExternalServicesSettings,
    fetchSessionStorageSettings,
    updateSessionStorageSettings,
    fetchStaticFilesSettings,
    updateStaticFilesSettings,
    fetchGeneralSettings,
    updateGeneralSettings,
  };
};

export default createSettingsService;

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

import {
  serializeConfigurationStorageSettings, deserializeConfigurationStorageSettings,
} from './mappings/configurationStorageSettingsMappings';

import {
  serializeCredentialsSettings, deserializeCredentialsSettings,
} from './mappings/adminCredentialsSettingsMappings';

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

  const fetchConfigurationStorageSettings = async () => {
    const url = `${process.env.API_URL}/settings/configuration`;
    const { data } = await httpClient.get(url);

    return deserializeConfigurationStorageSettings(data);
  };

  const updateConfigurationStorageSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/configuration`;
    return httpClient.put(url, serializeConfigurationStorageSettings(settings));
  };

  const fetchAdminCredentialsSettings = async () => {
    const url = `${process.env.API_URL}/settings`;
    const { data } = await httpClient.get(url);

    return deserializeCredentialsSettings(data.admin_account);
  };

  const updateAdminCredentialsSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/configuration`;
    return httpClient.put(url, serializeCredentialsSettings(settings));
  };

  const uploadJWTKeys = async (pubKey, privKey) => {
    const url = `${process.env.API_URL}/settings/keys`;

    const formData = new FormData();
    formData.append('keys', pubKey, 'public.pem');
    formData.append('keys', privKey, 'private.pem');

    return httpClient.post(url, formData);
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
    fetchConfigurationStorageSettings,
    updateConfigurationStorageSettings,
    fetchAdminCredentialsSettings,
    updateAdminCredentialsSettings,
    uploadJWTKeys,
  };
};

export default createSettingsService;

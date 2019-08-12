import {
  serializeLoginSettings, deserializeLoginSettings,
} from './mappings/loginSettingsMappings';

import {
  serializeExternalServicesSettings, deserializeExternalServicesSettings,
} from './mappings/externalSettingsMapping';

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

  return {
    fetchLoginSettings,
    updateLoginSettings,
    fetchExternalServicesSettings,
    updateExternalServicesSettings,
  };
};

export default createSettingsService;

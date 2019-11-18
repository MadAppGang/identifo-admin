import { toDeepCase } from '~/utils/apiMapper';

const CAMEL_CASE = 'camel';
const SNAKE_CASE = 'snake';

const createSettingsService = ({ httpClient }) => {
  const fetchLoginSettings = async () => {
    const url = `${process.env.API_URL}/settings/login`;
    const { data } = await httpClient.get(url);

    return toDeepCase(data, CAMEL_CASE);
  };

  const updateLoginSettings = (settings) => {
    const url = `${process.env.API_URL}/settings/login`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const fetchExternalServicesSettings = async () => {
    const url = `${process.env.API_URL}/settings/services`;
    const { data } = await httpClient.get(url);
    return toDeepCase(data, CAMEL_CASE);
  };

  const updateExternalServicesSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/services`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const fetchSessionStorageSettings = async () => {
    const url = `${process.env.API_URL}/settings/storage/session`;
    const { data } = await httpClient.get(url);
    return toDeepCase(data, CAMEL_CASE);
  };

  const updateSessionStorageSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/storage/session`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const fetchStaticFilesSettings = async () => {
    const url = `${process.env.API_URL}/settings/static`;
    const { data } = await httpClient.get(url);

    return toDeepCase(data, CAMEL_CASE);
  };

  const updateStaticFilesSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/static`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const fetchGeneralSettings = async () => {
    const url = `${process.env.API_URL}/settings/general`;
    const { data } = await httpClient.get(url);
    return toDeepCase(data, CAMEL_CASE);
  };

  const updateGeneralSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/general`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const fetchConfigurationStorageSettings = async () => {
    const url = `${process.env.API_URL}/settings/storage/configuration`;
    const { data } = await httpClient.get(url);

    return toDeepCase(data, CAMEL_CASE);
  };

  const updateConfigurationStorageSettings = async (settings) => {
    const url = `${process.env.API_URL}/settings/storage/configuration`;
    return httpClient.put(url, toDeepCase(settings, SNAKE_CASE));
  };

  const uploadJWTKeys = async (pubKey, privKey) => {
    const url = `${process.env.API_URL}/static/uploads/keys`;

    const formData = new FormData();
    formData.append('keys', pubKey, 'public.pem');
    formData.append('keys', privKey, 'private.pem');

    return httpClient.post(url, formData);
  };

  const requestServerRestart = async () => {
    const url = `${process.env.API_URL}/restart`; // TODO: not final
    await httpClient.post(url);
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
    uploadJWTKeys,
    requestServerRestart,
  };
};

export default createSettingsService;

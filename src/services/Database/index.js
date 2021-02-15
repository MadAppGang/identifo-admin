import { ENV } from '~/utils/environment';

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = ENV.getApiUrl();

  const testConnection = async (settings) => {
    const url = `${baseUrl}/admin/settings/storage/test`;
    const { data } = await httpClient.post(url, settings);

    return data;
  };

  const fetchSettings = async () => {
    const url = `${baseUrl}/admin/settings`;
    const { data } = await httpClient.get(url);

    return data.storage;
  };

  const postSettings = async (storage) => {
    const url = `${baseUrl}/admin/settings/storage`;
    const { data } = await httpClient.put(url, storage);

    return data;
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseService;

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const testConnection = async (settings) => {
    const url = `${baseUrl}/settings/database/test`;
    const { data } = await httpClient.post(url, settings);

    return data;
  };

  const fetchSettings = async () => {
    const url = `${baseUrl}/settings`;
    const { data } = await httpClient.get(url);

    return data.storage;
  };

  const postSettings = async (storage) => {
    const url = `${baseUrl}/settings/database`;
    const { data } = await httpClient.patch(url, { storage });

    return data;
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseService;

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = window.location.origin;

  const testConnection = async (settings) => {
    const url = `${baseUrl}/database/test`;

    try {
      const response = await httpClient.post(url, settings);
      return response.data;
    } catch (err) {
      if (err.response && err.response.data) {
        throw new Error(err.response.data.message);
      }

      throw err;
    }
  };

  const fetchSettings = async () => {
    const url = `${baseUrl}/database`;
    const response = await httpClient.get(url);

    return response.data;
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/database`;
    const response = await httpClient.post(url, settings);

    return response.data;
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseService;

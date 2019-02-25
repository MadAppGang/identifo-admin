import { getError } from '~/utils';

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = window.location.origin;

  const testConnection = async (settings) => {
    const url = `${baseUrl}/database/test`;

    try {
      const response = await httpClient.post(url, settings);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const fetchSettings = async () => {
    const url = `${baseUrl}/database`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/database`;

    try {
      const response = await httpClient.post(url, settings);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseService;

import { getError } from '~/utils';

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const testConnection = async (settings) => {
    const url = `${baseUrl}/settings/database/test`;

    try {
      const response = await httpClient.post(url, settings);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const fetchSettings = async () => {
    const url = `${baseUrl}/settings`;

    try {
      const response = await httpClient.get(url);
      return response.data.db_settings;
    } catch (err) {
      throw getError(err);
    }
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/settings/database`;

    try {
      const response = await httpClient.patch(url, { db_settings: settings });
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

import { resolve as resolveUrl } from 'url';
import { getError } from '~/utils';

const createDatabaseService = ({ httpClient }) => {
  const baseUrl = resolveUrl(window.location.origin, process.env.API_PATH);

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
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/settings`;

    try {
      const response = await httpClient.put(url, settings);
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

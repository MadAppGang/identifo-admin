import { resolve as resolveUrl } from 'url';
import { getError } from '~/utils';

const createAccountService = ({ httpClient }) => {
  const baseUrl = resolveUrl(window.location.origin, process.env.API_PATH);

  const fetchSettings = async () => {
    const url = `${baseUrl}/account/settings`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/account/settings`;

    try {
      await httpClient.post(url, settings);
    } catch (err) {
      throw getError(err);
    }
  };

  return Object.freeze({
    fetchSettings,
    postSettings,
  });
};

export default createAccountService;

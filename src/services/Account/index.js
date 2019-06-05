import { getError } from '~/utils';

const createAccountService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const fetchSettings = async () => {
    const url = `${baseUrl}/settings/account`;

    try {
      const response = await httpClient.get(url);
      return response.data;
    } catch (err) {
      throw getError(err);
    }
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/settings/account`;

    try {
      await httpClient.patch(url, settings);
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

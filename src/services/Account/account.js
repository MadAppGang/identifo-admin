import { toDeepCase } from '~/utils/apiMapper';

const createAccountService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const fetchSettings = async () => {
    const url = `${baseUrl}/settings/account`;
    const { data } = await httpClient.get(url);

    return toDeepCase(data, 'camel');
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/settings/account`;
    const { data } = httpClient.patch(url, toDeepCase(settings, 'snake'));

    return data;
  };

  return Object.freeze({
    fetchSettings,
    postSettings,
  });
};

export default createAccountService;

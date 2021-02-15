import { toDeepCase } from '~/utils/apiMapper';
import { ENV } from '~/utils/environment';

const createAccountService = ({ httpClient }) => {
  const baseUrl = ENV.getApiUrl();

  const fetchSettings = async () => {
    const url = `${baseUrl}/admin/settings/account`;
    const { data } = await httpClient.get(url);

    return toDeepCase(data, 'camel');
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/admin/settings/account`;
    const { data } = httpClient.patch(url, toDeepCase(settings, 'snake'));

    return data;
  };

  return Object.freeze({
    fetchSettings,
    postSettings,
  });
};

export default createAccountService;

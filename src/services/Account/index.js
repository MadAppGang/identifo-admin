const createAccountService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const fetchSettings = async () => {
    const url = `${baseUrl}/settings/account`;
    const { data } = await httpClient.get(url);

    return data;
  };

  const postSettings = async (settings) => {
    const url = `${baseUrl}/settings/account`;
    const { data } = httpClient.patch(url, settings);

    return data;
  };

  return Object.freeze({
    fetchSettings,
    postSettings,
  });
};

export default createAccountService;

const serializeLoginSettings = settings => ({
  login_with: settings.loginWith,
  tfa_type: settings.tfaType,
});

const deserializeLoginSettings = settings => ({
  loginWith: {
    username: !!settings.login_with.username,
    phone: !!settings.login_with.phone,
    federated: !!settings.login_with.federated,
  },
  tfaType: settings.tfa_type || '',
});

const createSettingsService = ({ httpClient }) => {
  const fetchLoginSettings = async () => {
    const url = `${process.env.API_URL}/settings/login`;
    const { data } = await httpClient.get(url);

    return deserializeLoginSettings(data);
  };

  const updateLoginSettings = (settings) => {
    const url = `${process.env.API_URL}/settings/login`;
    return httpClient.put(url, serializeLoginSettings(settings));
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
  };
};

export default createSettingsService;

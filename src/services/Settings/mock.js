import { pause } from '~/utils';

const data = {
  login: {
    loginWith: {
      username: true,
      phone: false,
      federated: false,
    },
    tfaType: 'app',
  },
};

const createSettingsServiceMock = () => {
  const fetchLoginSettings = async () => {
    await pause(400);
    return data.login;
  };

  const updateLoginSettings = async (settings) => {
    await pause(400);
    data.login = settings;
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
  };
};

export default createSettingsServiceMock;

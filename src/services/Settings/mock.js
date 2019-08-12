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
  externalServices: {
    mailService: 'mock',
    smsService: {
      type: 'mock',
      accountSid: '',
      authToken: '',
      serviceSid: '',
    },
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

  const fetchExternalServicesSettings = async () => {
    await pause(400);
    return data.externalServices;
  };

  const updateExternalServicesSettings = async (settings) => {
    await pause(400);
    data.externalServices = settings;
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
    fetchExternalServicesSettings,
    updateExternalServicesSettings,
  };
};

export default createSettingsServiceMock;

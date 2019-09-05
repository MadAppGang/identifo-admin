import { pause } from '~/utils';

const data = {
  general: {
    host: 'http://localhost:8081',
    issuer: 'http://localhost:8081',
    algorithm: 'auto',
  },
  login: {
    loginWith: {
      username: true,
      phone: false,
      federated: false,
    },
    tfaType: 'app',
  },
  adminAccount: {
    loginEnvName: 'IDENTIFO_ADMIN_LOGIN',
    passwordEnvName: 'IDENTIFO_ADMIN_PASSWORD',
  },
  externalServices: {
    emailService: {
      type: 'mock', // mock || mailgun || aws_ses
      domain: '', // mailgun-related
      privateKey: '', // mailgun-related
      publicKey: '', // mailgun-related
      sender: '',
      region: '', // ses-related,
    },
    smsService: {
      type: 'mock',
      accountSid: '',
      authToken: '',
      serviceSid: '',
    },
  },
  sessionStorage: {
    type: 'memory',
    sessionDuration: 300,
    address: '',
    password: '',
    db: '',
    region: '',
    endpoint: '',
  },
  staticFiles: {
    serverConfigPath: 'server-config.yaml',
    staticFolderPath: './web/static',
    emailTemplatesPath: './email_templates',
    emailTemplateNames: {
      welcome: 'welcome.html',
      resetPassword: 'reset_password.html',
      invite: 'invite_email.html',
      verify: 'verify_email.html',
      tfa: 'tfa_email.html',
    },
    adminPanelBuildPath: './admin_panel/build',
  },
  configurationStorage: {
    type: 'file',
    settingsKey: 'server-config.yaml',
    endpoints: '',
    region: '',
    bucket: 'bucket',
    keyStorage: {
      type: 'file',
      privateKey: 'jwt/private.pem',
      publicKey: 'jwt/public.pem',
      region: '',
      bucket: 'jwt bucket',
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

  const fetchSessionStorageSettings = async () => {
    await pause(400);
    return data.sessionStorage;
  };

  const updateSessionStorageSettings = async (settings) => {
    await pause(400);
    data.sessionStorage = settings;
  };

  const fetchStaticFilesSettings = async () => {
    await pause(400);
    return data.staticFiles;
  };

  const updateStaticFilesSettings = async (settings) => {
    await pause(400);
    data.staticFiles = settings;
  };

  const fetchGeneralSettings = async () => {
    await pause(400);
    return data.general;
  };

  const updateGeneralSettings = async (settings) => {
    await pause(400);
    data.general = settings;
  };

  const fetchConfigurationStorageSettings = async () => {
    await pause(400);
    return data.configurationStorage;
  };

  const updateConfigurationStorageSettings = async (settings) => {
    await pause(400);
    data.configurationStorage = settings;
  };

  const fetchAdminCredentialsSettings = async () => {
    await pause(400);
    return data.adminAccount;
  };

  const updateAdminCredentialsSettings = async (settings) => {
    await pause(400);
    data.adminAccount = settings;
  };

  const uploadJWTKeys = async () => {
    await pause(400);
  };

  return {
    fetchLoginSettings,
    updateLoginSettings,
    fetchExternalServicesSettings,
    updateExternalServicesSettings,
    fetchSessionStorageSettings,
    updateSessionStorageSettings,
    fetchStaticFilesSettings,
    updateStaticFilesSettings,
    fetchGeneralSettings,
    updateGeneralSettings,
    fetchConfigurationStorageSettings,
    updateConfigurationStorageSettings,
    fetchAdminCredentialsSettings,
    updateAdminCredentialsSettings,
    uploadJWTKeys,
  };
};

export default createSettingsServiceMock;

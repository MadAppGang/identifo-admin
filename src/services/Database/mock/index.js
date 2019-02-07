import { pause } from '~/utils';

const data = {
  settings: {
    type: 'mongodb',
    name: 'identifo',
    region: '',
    endpoint: 'localhost:27017',
  },
};

const createDatabaseServiceMock = () => {
  const testConnection = async (dbSettings) => {
    await pause(1000);

    if (dbSettings.type === 'mongodb') {
      return { result: 'ok' };
    }

    throw new Error('Unable to connect to specified endpoint');
  };

  const fetchSettings = async () => {
    await pause(1000);
    return data.settings;
  };

  const postSettings = async (settings) => {
    await pause(1000);
    data.settings = settings;
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseServiceMock;

import { pause } from '~/utils';

const data = {
  storage: {
    appStorage: {
      type: 'boltdb',
      name: 'identifo',
      endpoint: 'localhost:27017',
      region: 'us-west-2',
      path: './db.db',
    },
    userStorage: {
      type: 'boltdb',
      name: 'identifo',
      endpoint: 'localhost:27017',
      region: 'us-west-2',
      path: './db.db',
    },
    tokenStorage: {
      type: 'boltdb',
      name: 'identifo',
      endpoint: 'localhost:27017',
      region: 'us-west-2',
      path: './db.db',
    },
    verificationCodeStorage: {
      type: 'boltdb',
      name: 'identifo',
      endpoint: 'localhost:27017',
      region: 'us-west-2',
      path: './db.db',
    },
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

    return data.storage;
  };

  const postSettings = async (settings) => {
    await pause(1000);

    data.storage = settings;
  };

  return Object.freeze({
    testConnection,
    fetchSettings,
    postSettings,
  });
};

export default createDatabaseServiceMock;

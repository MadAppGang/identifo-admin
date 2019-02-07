import createHttpClient from './HttpClient';
import createStorage from './Storage';
import createAuthService from './Auth';
import createDatabaseService from './Database';

import createAuthServiceMock from './Auth/mock';
import createDatabaseServiceMock from './Database/mock';

const httpClient = createHttpClient();

const authService = createAuthService({
  httpClient,
  tokenStorage: createStorage(),
});

const databaseService = createDatabaseService({ httpClient });

const useMock = !!process.env.MOCK_API;

const services = {
  auth: useMock ? createAuthServiceMock() : authService,
  database: useMock ? createDatabaseServiceMock() : databaseService,
};

export default services;

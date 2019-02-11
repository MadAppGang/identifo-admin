import createHttpClient from './HttpClient';
import createStorage from './Storage';
import createAuthService from './Auth';
import createDatabaseService from './Database';
import createAccountService from './Account';

import createAuthServiceMock from './Auth/mock';
import createDatabaseServiceMock from './Database/mock';
import createAccountServiceMock from './Account/mock';

const httpClient = createHttpClient();

const authService = createAuthService({
  httpClient,
  tokenStorage: createStorage(),
});

const databaseService = createDatabaseService({ httpClient });
const accountService = createAccountService({ httpClient });

const useMock = !!process.env.MOCK_API;

const services = {
  auth: useMock ? createAuthServiceMock() : authService,
  database: useMock ? createDatabaseServiceMock() : databaseService,
  account: useMock ? createAccountServiceMock() : accountService,
};

export default services;

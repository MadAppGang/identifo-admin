import createHttpClient from './HttpClient';
import createStorage from './Storage';
import createAuthService from './Auth';
import createDatabaseService from './Database';
import createAccountService from './Account';
import createUserService from './Users';

import createAuthServiceMock from './Auth/mock';
import createDatabaseServiceMock from './Database/mock';
import createAccountServiceMock from './Account/mock';
import createUserServiceMock from './Users/mock';

const httpClient = createHttpClient();

const authService = createAuthService({
  httpClient,
  tokenStorage: createStorage(),
});

const databaseService = createDatabaseService({ httpClient });
const accountService = createAccountService({ httpClient });
const userService = createUserService({ httpClient });

const useMock = !!process.env.MOCK_API;

const services = {
  auth: useMock ? createAuthServiceMock() : authService,
  database: useMock ? createDatabaseServiceMock() : databaseService,
  account: useMock ? createAccountServiceMock() : accountService,
  users: useMock ? createUserServiceMock() : userService,
};

export default services;

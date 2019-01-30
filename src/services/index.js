import createHttpClient from './HttpClient';
import createStorage from './Storage';
import createAuthService from './Auth';

import createAuthServiceMock from './Auth/mock';

const authService = createAuthService({
  httpClient: createHttpClient(),
  tokenStorage: createStorage(),
});

const useMock = true;

const services = {
  auth: useMock ? createAuthServiceMock() : authService,
};

export default services;

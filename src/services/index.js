import createHttpClient from './HttpClient';
import createAuthService from './Auth';
import createStorage from './Storage';

const services = {
  auth: createAuthService({
    httpClient: createHttpClient(),
    tokenStorage: createStorage(),
  }),
};

export default services;

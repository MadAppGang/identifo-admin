import { pause } from '~/utils';

const createAuthService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const login = (email, password) => {
    const url = `${baseUrl}/login`;
    return httpClient.post(url, { email, password });
  };

  const logout = () => {
    const url = `${baseUrl}/logout`;
    return httpClient.post(url);
  };

  const checkAuthState = () => {
    const url = `${baseUrl}/me`;

    return new Promise((resolve) => {
      httpClient.get(url)
        .then(() => pause(500))
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  };

  return Object.freeze({
    login, logout, checkAuthState,
  });
};

export default createAuthService;

import { resolve as resolveUrl } from 'url';
import { pause } from '~/utils';

const createAuthService = ({ httpClient }) => {
  const baseUrl = resolveUrl(window.location.origin, process.env.API_PATH);

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

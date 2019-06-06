import { pause, getError } from '~/utils';

const createAuthService = ({ httpClient }) => {
  const baseUrl = process.env.API_URL;

  const login = async (email, password) => {
    const url = `${baseUrl}/login`;

    try {
      const response = await httpClient.post(url, { email, password });

      return response.data;
    } catch (err) {
      throw getError(err);
    }
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

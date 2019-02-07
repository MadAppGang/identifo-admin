import { pause } from '~/utils';

const storageKey = 'auth_mock_token';

const createAuthServiceMock = () => {
  const login = async (email, password) => {
    await pause(1000);

    if (email === 'email' && password === 'password') {
      localStorage.setItem(storageKey, '8li5R5jfAc1iLfuWuJlvW')
      return;
    }

    throw new Error('Email or password is incorrect');
  };

  const logout = async () => {
    localStorage.removeItem(storageKey);
  };

  const getAccessToken = () => localStorage.getItem(storageKey);

  const isLoggedIn = () => !!getAccessToken();

  return Object.freeze({
    login,
    logout,
    isLoggedIn,
    getAccessToken,
  });
};

export default createAuthServiceMock;

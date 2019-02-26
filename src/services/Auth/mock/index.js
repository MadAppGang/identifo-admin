import { pause } from '~/utils';

const createAuthServiceMock = () => {
  const login = async (email, password) => {
    await pause(1000);

    if (email === 'email' && password === 'password') {
      return;
    }

    throw new Error('Email or password is incorrect');
  };

  const logout = async () => {};

  const checkAuthState = async () => {
    await pause(78);

    return true;
  };

  return Object.freeze({
    login,
    logout,
    checkAuthState,
  });
};

export default createAuthServiceMock;

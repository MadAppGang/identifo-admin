const data = {
  token: '8li5R5jfAc1iLfuWuJlvW',
};

const createAuthServiceMock = () => {
  const login = async (email, password) => {
    if (email === 'email' && password === 'password') {
      return;
    }

    throw new Error('Email or password is incorrect');
  };

  const logout = async () => {};

  const getAccessToken = () => data.token;

  return Object.freeze({
    login, logout, getAccessToken,
  });
};

export default createAuthServiceMock;

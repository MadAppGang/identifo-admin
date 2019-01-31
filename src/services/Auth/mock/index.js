const pause = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const data = {
  token: '8li5R5jfAc1iLfuWuJlvW',
};

const createAuthServiceMock = () => {
  const login = async (email, password) => {
    await pause(1000);

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

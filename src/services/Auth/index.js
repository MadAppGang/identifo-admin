const createAuthService = ({ httpClient, tokenStorage }) => {
  const baseUrl = window.location.origin;

  const login = async (email, password) => {
    const url = `${baseUrl}/login`;
    const token = await httpClient.post(url, { email, password });

    tokenStorage.set(token);
  };

  const logout = async () => {
    const url = `${baseUrl}/logout`;

    await httpClient.delete(url, {
      headers: {
        'X-Auth-Token': tokenStorage.get(),
      },
    });

    tokenStorage.clear();
  };

  const getAccessToken = () => tokenStorage.get();

  return Object.freeze({
    login, logout, getAccessToken,
  });
};

export default createAuthService;

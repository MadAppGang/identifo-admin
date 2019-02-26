const createAuthService = ({ httpClient }) => {
  const baseUrl = window.location.origin;

  const login = async (email, password) => {
    const url = `${baseUrl}/login`;
    httpClient.post(url, { email, password });
  };

  const logout = async () => {
    const url = `${baseUrl}/logout`;
    httpClient.post(url);
  };

  const checkAuthState = async () => {
    const url = `${baseUrl}/me`;

    try {
      await httpClient.get(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  return Object.freeze({
    login,
    logout,
    checkAuthState,
  });
};

export default createAuthService;

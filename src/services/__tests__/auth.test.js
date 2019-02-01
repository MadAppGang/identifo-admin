import createAuthService from '../Auth';

describe('auth service', () => {
  let auth;
  let dependencies;
  const token = 'xxx-token';

  beforeEach(() => {
    dependencies = {
      httpClient: {
        post: jest.fn(() => Promise.resolve(token)),
        delete: jest.fn(() => Promise.resolve()),
      },
      tokenStorage: {
        set: jest.fn(),
        get: jest.fn(() => token),
        clear: jest.fn(),
      },
    };

    auth = createAuthService(dependencies);
  });

  test('sends http POST on login with email and password as a body', () => {
    auth.login('email', 'password');

    const secondArgument = dependencies.httpClient.post.mock.calls[0][1];
    const expectedBody = {
      email: 'email',
      password: 'password',
    };

    expect(secondArgument).toEqual(expectedBody);
  });

  test('stores received token into storage after successful login', async () => {
    await auth.login('email', 'password');
    expect(dependencies.tokenStorage.set).toHaveBeenCalledWith(token);
  });

  test('returns access token from the storage', () => {
    expect(auth.getAccessToken()).toBe(token);
  });

  test('sends http DELETE on logout and signs it with token in headers', () => {
    auth.logout();

    expect(dependencies.httpClient.delete).toHaveBeenCalled();

    const secondArgument = dependencies.httpClient.delete.mock.calls[0][1];
    const expectedRequest = {
      headers: {
        'X-Auth-Token': token,
      },
    };

    expect(secondArgument).toEqual(expectedRequest);
  });

  test('clears storage after successful logout', async () => {
    await auth.logout();

    expect(dependencies.tokenStorage.clear).toHaveBeenCalled();
  });

  test('returns true for is logged in check if token is present', () => {
    expect(auth.isLoggedIn()).toBe(true);
  });

  test('returns false for is logged in check if token is absent', () => {
    dependencies.tokenStorage.get = jest.fn();
    expect(auth.isLoggedIn()).toBe(false);
  });
});

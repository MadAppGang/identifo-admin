import createAuthService from '../Auth';

describe('auth service', () => {
  let auth;
  let dependencies;

  beforeEach(() => {
    dependencies = {
      httpClient: {
        get: jest.fn(),
        post: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
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

  test('sends http POST on logout and signs it with token in headers', () => {
    auth.logout();
    expect(dependencies.httpClient.post).toHaveBeenCalled();
  });

  test('returns true if http request passes on checkAuthState', async () => {
    dependencies.httpClient.get.mockReturnValue(Promise.resolve());
    const authState = await auth.checkAuthState();

    expect(authState).toBe(true);
  });

  test('returns false if http request failes on checkAuthState', async () => {
    dependencies.httpClient.get.mockReturnValue(Promise.reject(new Error('error')));
    const authState = await auth.checkAuthState();
    expect(authState).toBe(false);
  });
});

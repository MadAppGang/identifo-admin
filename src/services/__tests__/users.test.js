import createUserServiceMock from '../Users';

describe('user service creator function', () => {
  test('is a function', () => {
    expect(createUserServiceMock).toBeInstanceOf(Function);
  });

  test('return an object', () => {
    expect(createUserServiceMock({})).toBeInstanceOf(Object);
  });
});

describe('user service', () => {
  let httpClient;
  let userService;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
    };
    userService = createUserServiceMock({ httpClient });
  });

  test('invokes httpClient.get when fetching users', () => {
    httpClient.get.mockReturnValue(Promise.resolve({}));
    userService.fetchUsers({ search: '' });
    expect(httpClient.get).toBeCalled();
  });

  test('inclues passed search param into url when fetching users', () => {
    const search = 'hello';

    httpClient.get.mockReturnValue(Promise.resolve({}));
    userService.fetchUsers({ search });
    expect(httpClient.get.mock.calls[0][0]).toContain(search);
  });

  test('throws an error on rejected http request when feching users', async () => {
    const expectedErr = new Error('message');
    httpClient.get.mockReturnValue(Promise.reject(expectedErr));

    try {
      await userService.fetchUsers({ search: '' });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(expectedErr);
    }
  });

  test('throws an error with message from response body on rejected http request', async () => {
    const expectedMessage = 'error message';
    const rejectReason = {
      response: {
        data: {
          message: expectedMessage,
        },
      },
    };

    httpClient.get.mockReturnValue(Promise.reject(rejectReason));

    try {
      await userService.fetchUsers({ search: '' });
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toBe(expectedMessage);
    }
  });
});

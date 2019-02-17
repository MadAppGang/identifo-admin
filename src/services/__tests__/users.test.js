import createUserService from '../Users';

describe('user service creator function', () => {
  test('is a function', () => {
    expect(createUserService).toBeInstanceOf(Function);
  });

  test('return an object', () => {
    expect(createUserService({})).toBeInstanceOf(Object);
  });
});

describe('user service', () => {
  let httpClient;
  let userService;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
    };
    userService = createUserService({ httpClient });
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

  test('throws an error with message from response body on rejected get request', async () => {
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

  test('invokes httpClient.post when posting a user', () => {
    httpClient.post.mockReturnValue(Promise.resolve({}));
    userService.postUser({});
    expect(httpClient.post).toBeCalled();
  });

  test('puts passed user as request body when posting a user', () => {
    const user = {};
    httpClient.post.mockReturnValue(Promise.resolve({}));
    userService.postUser(user);
    expect(httpClient.post.mock.calls[0][1]).toBe(user);
  });

  test('throws an error on rejected http request when posting a user', async () => {
    const expectedErr = new Error('message');
    httpClient.post.mockReturnValue(Promise.reject(expectedErr));

    try {
      await userService.postUser({});
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(expectedErr);
    }
  });

  test('throws an error with message from response body on rejected post request', async () => {
    const expectedMessage = 'error message';
    const rejectReason = {
      response: {
        data: {
          message: expectedMessage,
        },
      },
    };

    httpClient.post.mockReturnValue(Promise.reject(rejectReason));

    try {
      await userService.postUser({});
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toBe(expectedMessage);
    }
  });

  test('invokes httpClient.put method when altering user', () => {
    httpClient.put.mockReturnValue(Promise.resolve({}));
    userService.alterUser(1, {});
    expect(httpClient.put).toBeCalled();
  });

  test('puts passed changes as a request body in http PUT', () => {
    const changes = {};
    httpClient.put.mockReturnValue(Promise.resolve({}));
    userService.alterUser(1, changes);
    expect(httpClient.put.mock.calls[0][1]).toEqual(changes);
  });

  test('alterUser returns http request result', async () => {
    const data = { result: 'ok' };
    httpClient.put.mockReturnValue({ data });
    const response = await userService.alterUser(1, {});
    expect(response).toBe(data);
  });

  test('throws an error on rejected http request when altering user', async () => {
    const expectedErr = new Error('message');
    httpClient.put.mockReturnValue(Promise.reject(expectedErr));

    try {
      await userService.alterUser(1, {});
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(expectedErr);
    }
  });

  test('throws an error with message from response body on rejected put request', async () => {
    const expectedMessage = 'error message';
    const rejectReason = {
      response: {
        data: {
          message: expectedMessage,
        },
      },
    };

    httpClient.put.mockReturnValue(Promise.reject(rejectReason));

    try {
      await userService.alterUser(1, {});
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toBe(expectedMessage);
    }
  });
});

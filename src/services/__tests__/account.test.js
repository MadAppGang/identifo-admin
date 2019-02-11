import createAccountService from '../Account';

describe('account service creator function', () => {
  test('is a function', () => {
    expect(createAccountService).toBeInstanceOf(Function);
  });

  test('returns an object', () => {
    expect(createAccountService({})).toBeInstanceOf(Object);
  });
});

describe('account service', () => {
  let httpClient;
  let account;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(),
      post: jest.fn(),
    };
    account = createAccountService({ httpClient });
  });

  test('sends http GET on fetch settings', () => {
    httpClient.get.mockReturnValue(Promise.resolve({}));
    account.fetchSettings();
    expect(httpClient.get).toBeCalled();
  });

  test('sends http POST on post settings', () => {
    httpClient.get.mockReturnValue(Promise.resolve({}));
    account.fetchSettings();
    expect(httpClient.get).toBeCalled();
  });

  test('sends http POST on post settings', () => {
    account.postSettings();
    expect(httpClient.post).toBeCalled();
  });

  test('puts passed settings to http POST request body', () => {
    const settings = {};
    account.postSettings(settings);
    expect(httpClient.post.mock.calls[0][1]).toBe(settings);
  });

  test('fetch settings throws an error on unsuccessful http request', async () => {
    const expectedErr = new Error('message');
    httpClient.get.mockReturnValue(Promise.reject(expectedErr));

    try {
      await account.fetchSettings();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(expectedErr);
    }
  });

  test('fetch settings throws an error with message from response body on unsuccessful http request', async () => {
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
      await account.fetchSettings();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toBe(expectedMessage);
    }
  });

  test('post settings throws an error on unsuccessful http request', async () => {
    const expectedErr = new Error('message');
    httpClient.post.mockReturnValue(Promise.reject(expectedErr));

    try {
      await account.postSettings();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(expectedErr);
    }
  });

  test('post settings throws an error with message from response body on unsuccessful http request', async () => {
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
      await account.postSettings();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err.message).toBe(expectedMessage);
    }
  });
});

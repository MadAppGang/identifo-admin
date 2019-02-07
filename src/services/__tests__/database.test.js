import createDatabaseService from '../Database';

describe('database service', () => {
  let db;
  let httpClient;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(() => Promise.resolve({})),
      post: jest.fn(() => Promise.resolve({})),
    };
    db = createDatabaseService({ httpClient });
  });

  test('is an object', () => {
    expect(db).toBeInstanceOf(Object);
  });

  test('sends post request on test connection', () => {
    db.testConnection();
    expect(httpClient.post).toHaveBeenCalled();
  });

  test('sets passed settings a request body for http request when testing connection', () => {
    const settings = {}
    db.testConnection(settings);
    expect(httpClient.post.mock.calls[0][1]).toBe(settings);
  });

  test('throws an error when httpClient rejects the test connection', async () => {
    const error = new Error('error');
    httpClient.post.mockReturnValue(Promise.reject(error));

    try {
      await db.testConnection();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toBe(error);
    }
  });

  test('sends http get on fetch settings', () => {
    db.fetchSettings();
    expect(httpClient.get).toBeCalled();
  });

  test('throws an error if http get returns rejected promise when fetching settings', async () => {
    const err = new Error('error');
    httpClient.get.mockReturnValue(Promise.reject(err));

    try {
      await db.fetchSettings();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBe(err);
    }
  });

  test('sends http post on post settings', () => {
    db.postSettings();
    expect(httpClient.post).toBeCalled();
  });

  test('sets passed settings as a request body for http request', () => {
    const settings = {};
    db.postSettings(settings);
    expect(httpClient.post.mock.calls[0][1]).toBe(settings);
  });

  test('throws an error if http post returns rejected promise when posting settings', async () => {
    const err = new Error('error');
    httpClient.post.mockReturnValue(Promise.reject(err));

    try {
      await db.postSettings();
      expect(true).toBeFalsy();
    } catch (error) {
      expect(error).toBe(err);
    }
  });
});

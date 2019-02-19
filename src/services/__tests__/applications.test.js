import createApplicationService from '../Applications';

describe('application service creator function', () => {
  test('is a function', () => {
    expect(createApplicationService).toBeInstanceOf(Function);
  });

  test('returns an object', () => {
    expect(createApplicationService({})).toBeInstanceOf(Object);
  });
});

describe('application service', () => {
  let httpClient;
  let applications;

  beforeEach(() => {
    httpClient = {
      get: jest.fn(() => Promise.resolve({})),
    };
    applications = createApplicationService({ httpClient });
  });

  test('calls httpClient.get', () => {
    applications.fetchApplications();
    expect(httpClient.get).toBeCalled();
  });

  test('returns data from http response', async () => {
    const data = [{ id: '1' }];
    httpClient.get.mockReturnValue(Promise.resolve({ data }));
    const response = await applications.fetchApplications();
    expect(response).toEqual(data);
  });

  test('throws error on unsucessfull http request', async () => {
    const reason = new Error('error');
    httpClient.get.mockReturnValue(Promise.reject(reason));

    try {
      await applications.fetchApplications();
      expect(true).toBeFalsy();
    } catch (err) {
      expect(err).toEqual(reason);
    }
  })
});

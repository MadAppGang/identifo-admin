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
      post: jest.fn(() => Promise.resolve({})),
      put: jest.fn(() => Promise.resolve({})),
      delete: jest.fn(() => Promise.resolve({})),
    };
    applications = createApplicationService({ httpClient });
  });

  describe('fetchApplications method', () => {
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
    });
  });

  describe('fetchApplicationById method', () => {
    test('calls httpClient.get', () => {
      applications.fetchApplicationById('1');
      expect(httpClient.get).toBeCalled();
    });

    test('returns data from http response', async () => {
      const data = { id: '1' };
      httpClient.get.mockReturnValue(Promise.resolve({ data }));
      const response = await applications.fetchApplicationById('1');
      expect(response).toEqual(data);
    });

    test('includes id in url when making http request', () => {
      const id = '1234556f';
      httpClient.get.mockReturnValue(Promise.resolve({}));
      applications.fetchApplicationById(id);
      expect(httpClient.get.mock.calls[0][0]).toContain(id);
    });

    test('throws error on unsucessfull http request', async () => {
      const reason = new Error('error');
      httpClient.get.mockReturnValue(Promise.reject(reason));

      try {
        await applications.fetchApplicationById('1');
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toEqual(reason);
      }
    });
  });

  describe('postApplication method', () => {
    test('calls httpClient.post', () => {
      applications.postApplication({});
      expect(httpClient.post).toBeCalled();
    });

    test('returns data from http response', async () => {
      const data = { id: '1' };
      httpClient.post.mockReturnValue(Promise.resolve({ data }));
      const response = await applications.postApplication({});
      expect(response).toEqual(data);
    });

    test('throws error on unsucessfull http request', async () => {
      const reason = new Error('error');
      httpClient.post.mockReturnValue(Promise.reject(reason));

      try {
        await applications.postApplication({});
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toEqual(reason);
      }
    });
  });

  describe('alterApplication method', () => {
    test('calls httpClient.put', () => {
      applications.alterApplication('1', {});
      expect(httpClient.put).toBeCalled();
    });

    test('returns data from http response', async () => {
      const data = { id: '1' };
      httpClient.put.mockReturnValue(Promise.resolve({ data }));
      const response = await applications.alterApplication({});
      expect(response).toEqual(data);
    });

    test('throws error on unsuccessfull http request', async () => {
      const reason = new Error('error');
      httpClient.put.mockReturnValue(Promise.reject(reason));

      try {
        await applications.alterApplication({});
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toEqual(reason);
      }
    });
  });

  describe('deleteApplicationById method', () => {
    test('calls httpClient.delete', () => {
      applications.deleteApplicationById('1');
      expect(httpClient.delete).toBeCalled();
    });

    test('returns data from http response', async () => {
      const data = { id: '1' };
      httpClient.delete.mockReturnValue(Promise.resolve({ data }));
      const response = await applications.deleteApplicationById('1');
      expect(response).toEqual(data);
    });

    test('includes id in url when making http request', () => {
      const id = '1234556f';
      httpClient.delete.mockReturnValue(Promise.resolve({}));
      applications.deleteApplicationById(id);
      expect(httpClient.delete.mock.calls[0][0]).toContain(id);
    });

    test('throws error on unsuccessfull http request', async () => {
      const reason = new Error('error');
      httpClient.delete.mockReturnValue(Promise.reject(reason));

      try {
        await applications.deleteApplicationById('1');
        expect(true).toBeFalsy();
      } catch (err) {
        expect(err).toEqual(reason);
      }
    });
  });
});

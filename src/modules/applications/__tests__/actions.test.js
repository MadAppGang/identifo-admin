import {
  fetchApplications,
  fetchApplicationById,
  postApplication,
  deleteApplicationById,
  alterApplication,
} from '../actions';
import types from '../types';

describe('[applications] fetchApplications action creator', () => {
  let dispatch;
  let applications;

  beforeEach(() => {
    dispatch = jest.fn();
    applications = {
      fetchApplications: jest.fn(() => Promise.resolve({})),
    };
  });

  test('calls dispatch with attempt action', () => {
    const action = { type: types.FETCH_APPLICATIONS_ATTEMPT };
    fetchApplications()(dispatch, null, { applications });
    expect(dispatch).toBeCalledWith(action);
  });

  test('calls dispatch second time with success action', async () => {
    const list = [{}, {}];
    const action = { type: types.FETCH_APPLICATIONS_SUCCESS, payload: list };
    applications.fetchApplications.mockReturnValue(Promise.resolve(list));
    await fetchApplications()(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('calls dispatch second time with failure action', async () => {
    const reason = new Error('error');
    const action = { type: types.FETCH_APPLICATIONS_FAILURE, payload: reason };
    applications.fetchApplications.mockReturnValue(Promise.reject(reason));
    await fetchApplications()(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('invokes applications service to fetch the list', () => {
    fetchApplications()(dispatch, null, { applications });
    expect(applications.fetchApplications).toBeCalled();
  });
});

describe('[applications] postApplication action creator', () => {
  let dispatch;
  let applications;

  beforeEach(() => {
    dispatch = jest.fn();
    applications = {
      postApplication: jest.fn(() => Promise.resolve({})),
    };
  });

  test('calls dispatch with attempt action', () => {
    const action = { type: types.POST_APPLICATION_ATTEMPT };
    postApplication()(dispatch, null, { applications });
    expect(dispatch).toBeCalledWith(action);
  });

  test('calls dispatch second time with success action', async () => {
    const app = {};
    const action = { type: types.POST_APPLICATION_SUCCESS, payload: app };
    applications.postApplication.mockReturnValue(Promise.resolve(app));
    await postApplication()(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('calls dispatch second time with failure action', async () => {
    const reason = new Error('error');
    const action = { type: types.POST_APPLICATION_FAILURE, payload: reason };
    applications.postApplication.mockReturnValue(Promise.reject(reason));
    await postApplication({})(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('invokes applications service to post an application', () => {
    const app = {};
    postApplication(app)(dispatch, null, { applications });
    expect(applications.postApplication).toBeCalledWith(app);
  });
});

describe('[applications] deleteApplicationById action creator', () => {
  let dispatch;
  let applications;

  beforeEach(() => {
    dispatch = jest.fn();
    applications = {
      deleteApplicationById: jest.fn(() => Promise.resolve({})),
    };
  });

  test('calls dispatch with attempt action', () => {
    const action = { type: types.DELETE_APPLICATION_ATTEMPT };
    deleteApplicationById('1')(dispatch, null, { applications });
    expect(dispatch).toBeCalledWith(action);
  });

  test('calls dispatch second time with success action', async () => {
    const id = '1';
    const action = { type: types.DELETE_APPLICATION_SUCCESS, payload: id };
    await deleteApplicationById(id)(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('calls dispatch second time with failure action', async () => {
    const reason = new Error('error');
    const action = { type: types.DELETE_APPLICATION_FAILURE, payload: reason };
    applications.deleteApplicationById.mockReturnValue(Promise.reject(reason));
    await deleteApplicationById('1')(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('invokes applications service to delete an application', () => {
    const app = {};
    deleteApplicationById(app)(dispatch, null, { applications });
    expect(applications.deleteApplicationById).toBeCalledWith(app);
  });
});

describe('[applications] alterApplication action creator', () => {
  let dispatch;
  let applications;

  beforeEach(() => {
    dispatch = jest.fn();
    applications = {
      alterApplication: jest.fn(() => Promise.resolve({})),
    };
  });

  test('calls dispatch with attempt action', () => {
    const action = { type: types.ALTER_APPLICATION_ATTEMPT };
    alterApplication('1', {})(dispatch, null, { applications });
    expect(dispatch).toBeCalledWith(action);
  });

  test('calls dispatch second time with success action', async () => {
    const payload = {};
    const action = { type: types.ALTER_APPLICATION_SUCCESS, payload };
    await alterApplication(payload)(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('calls dispatch second time with failure action', async () => {
    const reason = new Error('error');
    const action = { type: types.ALTER_APPLICATION_FAILURE, payload: reason };
    applications.alterApplication.mockReturnValue(Promise.reject(reason));
    await alterApplication('1', {})(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('invokes applications service to alter an application', () => {
    const id = '1'
    const changes = {};
    alterApplication(id, changes)(dispatch, null, { applications });
    expect(applications.alterApplication).toBeCalledWith(id, changes);
  });
});

describe('[applications] fetchApplicationById action creator', () => {
  let dispatch;
  let applications;

  beforeEach(() => {
    dispatch = jest.fn();
    applications = {
      fetchApplicationById: jest.fn(() => Promise.resolve({})),
    };
  });

  test('calls dispatch with attempt action', () => {
    const action = { type: types.FETCH_APPLICATION_BY_ID_ATTEMPT };
    fetchApplicationById('1', {})(dispatch, null, { applications });
    expect(dispatch).toBeCalledWith(action);
  });

  test('calls dispatch second time with success action', async () => {
    const payload = {};
    const action = { type: types.FETCH_APPLICATION_BY_ID_SUCCESS, payload };
    await fetchApplicationById('1')(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('calls dispatch second time with failure action', async () => {
    const reason = new Error('error');
    const action = { type: types.FETCH_APPLICATION_BY_ID_FAILURE, payload: reason };
    applications.fetchApplicationById.mockReturnValue(Promise.reject(reason));
    await fetchApplicationById('1')(dispatch, null, { applications });
    expect(dispatch).toHaveBeenNthCalledWith(2, action);
  });

  test('invokes applications service to alter an application', () => {
    const id = '1';
    fetchApplicationById(id)(dispatch, null, { applications });
    expect(applications.fetchApplicationById).toBeCalledWith(id);
  });
});

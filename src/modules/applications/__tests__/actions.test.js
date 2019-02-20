import { fetchApplications, postApplication } from '../actions';
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
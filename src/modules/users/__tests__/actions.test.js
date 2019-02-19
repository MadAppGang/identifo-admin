import { fetchUsers, postUser, fetchUserById, deleteUserById } from '../actions';
import types from '../types';

describe('fetchUsers redux action', () => {
  let dispatch;
  let userService;

  beforeEach(() => {
    dispatch = jest.fn();
    userService = {
      fetchUsers: jest.fn(),
    };
  });

  test('calls dispatch with attempt action', () => {
    const expectedAction = {
      type: types.FETCH_USERS_ATTEMPT,
    };
    fetchUsers()(dispatch, null, { users: userService });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('calls dispatch second time with success action', async () => {
    const users = [];
    const expectedAction = {
      type: types.FETCH_USERS_SUCCESS,
      payload: users,
    };

    userService.fetchUsers.mockReturnValue(Promise.resolve(users));
    await fetchUsers()(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('calls dispatch second time with failure action on failed fetch', async () => {
    const reason = new Error('error');
    const expectedAction = {
      type: types.FETCH_USERS_FAILURE,
      payload: reason,
    };

    userService.fetchUsers.mockReturnValue(Promise.reject(reason));
    await fetchUsers()(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('invokes fetchUsers service method', () => {
    const filters = {};
    fetchUsers(filters)(dispatch, null, { users: userService });
    expect(userService.fetchUsers).toHaveBeenCalledWith(filters);
  });
});

describe('postUser redux action creator', () => {
  let dispatch;
  let userService;

  beforeEach(() => {
    dispatch = jest.fn();
    userService = {
      postUser: jest.fn(),
    };
  });

  test('calls dispatch with attempt action', () => {
    const expectedAction = { type: types.POST_USER_ATTEMPT };
    postUser({})(dispatch, null, { users: userService });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('calls dispatch second time with success action', async () => {
    const response = {};
    const expectedAction = { type: types.POST_USER_SUCCESS, payload: response };

    userService.postUser.mockReturnValue(Promise.resolve(response));
    await postUser({})(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('calls dispatch second time with failure action on rejected service call', async () => {
    const reason = new Error('reason');
    const expectedAction = { type: types.POST_USER_FAILURE, payload: reason };

    userService.postUser.mockReturnValue(Promise.reject(reason));
    await postUser({})(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('invokes postUser service method', () => {
    const user = {};
    postUser(user)(dispatch, null, { users: userService });
    expect(userService.postUser).toBeCalledWith(user);
  });
});

describe('fetchUserById redux action creator', () => {
  let dispatch;
  let userService;

  beforeEach(() => {
    dispatch = jest.fn();
    userService = {
      fetchUserById: jest.fn(),
    };
  });

  test('dispatches attempt', () => {
    const expectedAction = { type: types.FETCH_USER_BY_ID_ATTEMPT };
    fetchUserById()(dispatch, null, { users: userService });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('calls dispatch second time with success action', async () => {
    const user = {};
    userService.fetchUserById.mockReturnValue(Promise.resolve(user));
    const expectedAction = { type: types.FETCH_USER_BY_ID_SUCCESS, payload: user };
    await fetchUserById()(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('calls dispatch second time with failure action', async () => {
    const expectedErr = new Error('message');
    userService.fetchUserById.mockReturnValue(Promise.reject(expectedErr));
    const expectedAction = { type: types.FETCH_USER_BY_ID_FAILURE, payload: expectedErr };
    await fetchUserById()(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('invokes userService.fetchById', () => {
    const id = '507f191e810c19729de860ea';
    fetchUserById(id)(dispatch, null, { users: userService });
    expect(userService.fetchUserById).toBeCalledWith(id);
  });
});

describe('deleteUserById redux action creator', () => {
  let dispatch;
  let userService;

  beforeEach(() => {
    dispatch = jest.fn();
    userService = {
      deleteUserById: jest.fn(),
    };
  });

  test('dispatches attempt', () => {
    const expectedAction = { type: types.DELETE_USER_BY_ID_ATTEMPT };
    deleteUserById()(dispatch, null, { users: userService });
    expect(dispatch).toBeCalledWith(expectedAction);
  });

  test('calls dispatch second time with success action', async () => {
    const id = '1';
    userService.deleteUserById.mockReturnValue(Promise.resolve({}));
    const expectedAction = { type: types.DELETE_USER_BY_ID_SUCCESS, payload: id };
    await deleteUserById(id)(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('calls dispatch second time with failure action', async () => {
    const expectedErr = new Error('message');
    userService.deleteUserById.mockReturnValue(Promise.reject(expectedErr));
    const expectedAction = { type: types.DELETE_USER_BY_ID_FAILURE, payload: expectedErr };
    await deleteUserById()(dispatch, null, { users: userService });
    expect(dispatch).toHaveBeenNthCalledWith(2, expectedAction);
  });

  test('invokes userService.deleteUserById', () => {
    const id = '507f191e810c19729de860ea';
    deleteUserById(id)(dispatch, null, { users: userService });
    expect(userService.deleteUserById).toBeCalledWith(id);
  });
});

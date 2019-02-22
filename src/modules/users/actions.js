import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchAttempt = actionCreator(types.FETCH_USERS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_USERS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_USERS_FAILURE);

const postAttempt = actionCreator(types.POST_USER_ATTEMPT);
const postSuccess = actionCreator(types.POST_USER_SUCCESS);
const postFailure = actionCreator(types.POST_USER_FAILURE);

const alterAttempt = actionCreator(types.ALTER_USER_ATTEMPT);
const alterSuccess = actionCreator(types.ALTER_USER_SUCCESS);
const alterFailure = actionCreator(types.ALTER_USER_FAILURE);

const fetchByIdAttempt = actionCreator(types.FETCH_USER_BY_ID_ATTEMPT);
const fetchByIdSuccess = actionCreator(types.FETCH_USER_BY_ID_SUCCESS);
const fetchByIdFailure = actionCreator(types.FETCH_USER_BY_ID_FAILURE);

const deleteAttempt = actionCreator(types.DELETE_USER_BY_ID_ATTEMPT);
const deleteSuccess = actionCreator(types.DELETE_USER_BY_ID_SUCCESS);
const deleteFailure = actionCreator(types.DELETE_USER_BY_ID_FAILURE);

const fetchUsers = filters => async (dispatch, _, { users: userService }) => {
  dispatch(fetchAttempt());

  try {
    const users = await userService.fetchUsers(filters);
    dispatch(fetchSuccess(users));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

const postUser = user => async (dispatch, _, { users: userService }) => {
  dispatch(postAttempt());

  try {
    const result = await userService.postUser(user);
    dispatch(postSuccess(result));
  } catch (err) {
    dispatch(postFailure(err));
  }
};

const alterUser = (id, changes) => async (dispatch, _, { users: userService }) => {
  dispatch(alterAttempt());

  try {
    const user = await userService.alterUser(id, changes);
    dispatch(alterSuccess(user));
  } catch (err) {
    dispatch(alterFailure(err));
  }
};

const fetchUserById = id => async (dispatch, _, { users: userService }) => {
  dispatch(fetchByIdAttempt());

  try {
    const user = await userService.fetchUserById(id);
    dispatch(fetchByIdSuccess(user));
  } catch (err) {
    dispatch(fetchByIdFailure(err));
  }
};

const deleteUserById = id => async (dispatch, _, { users: userService }) => {
  dispatch(deleteAttempt());

  try {
    await userService.deleteUserById(id);
    dispatch(deleteSuccess(id));
  } catch (err) {
    dispatch(deleteFailure(err));
  }
};

const resetUserError = actionCreator(types.RESET_USER_ERROR);

export {
  fetchUsers,
  postUser,
  alterUser,
  fetchUserById,
  deleteUserById,
  resetUserError,
};

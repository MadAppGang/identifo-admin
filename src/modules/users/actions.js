import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchAttempt = actionCreator(types.FETCH_USERS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_USERS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_USERS_FAILURE);

const postAttempt = actionCreator(types.POST_USER_ATTEMPT);
const postSuccess = actionCreator(types.POST_USER_SUCCESS);
const postFailure = actionCreator(types.POST_USER_FAILURE);

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

export {
  fetchUsers,
  postUser,
};

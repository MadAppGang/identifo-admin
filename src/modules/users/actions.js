import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchAttempt = actionCreator(types.FETCH_USERS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_USERS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_USERS_FAILURE);

const fetchUsers = filters => async (dispatch, _, { users: userService }) => {
  dispatch(fetchAttempt());

  try {
    const users = await userService.fetchUsers(filters);
    dispatch(fetchSuccess(users));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

export {
  fetchUsers,
};

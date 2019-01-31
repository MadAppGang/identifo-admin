import actionCreator from '@madappgang/action-creator';
import types from './types';

const loginAttempt = actionCreator(types.LOGIN_ATTEMPT);
const loginSuccess = actionCreator(types.LOGIN_SUCCESS);
const loginFailure = actionCreator(types.LOGIN_FAILURE);

const logoutAttempt = actionCreator(types.LOGOUT_ATTEMPT);
const logoutSuccess = actionCreator(types.LOGOUT_SUCCESS);

const login = (email, password) => async (dispatch, _, { auth }) => {
  dispatch(loginAttempt());

  try {
    await auth.login(email, password);
    dispatch(loginSuccess());
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

const logout = () => async (dispatch, _, { auth }) => {
  dispatch(logoutAttempt());
  await auth.logout();
  dispatch(logoutSuccess());
};

const resetError = () => ({
  type: types.LOGIN_FAILURE,
  payload: null,
});

export {
  login,
  logout,
  resetError,
};

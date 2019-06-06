import actionCreator from '@madappgang/action-creator';
import types from './types';

const loginAttempt = actionCreator(types.LOGIN_ATTEMPT);
const loginFailure = actionCreator(types.LOGIN_FAILURE);
const logoutAttempt = actionCreator(types.LOGOUT_ATTEMPT);
const authStateChange = actionCreator(types.AUTH_STATE_CHANGE);

const login = (email, password) => async (dispatch, _, { auth }) => {
  dispatch(loginAttempt());

  try {
    await auth.login(email, password);
    dispatch(authStateChange(true));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

const logout = () => async (dispatch, _, { auth }) => {
  dispatch(logoutAttempt());
  await auth.logout();

  window.location.reload();
};

const checkAuthState = () => async (dispatch, _, { auth }) => {
  dispatch(loginAttempt());
  const authState = await auth.checkAuthState();
  dispatch(authStateChange(authState));
};

const resetError = () => ({
  type: types.LOGIN_FAILURE,
  payload: null,
});

export {
  login,
  logout,
  resetError,
  checkAuthState,
};

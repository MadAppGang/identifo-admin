import actionCreator from '@madappgang/action-creator';
import { getError, getStatus } from '~/utils';
import types from './types';
import { logout } from '../auth/actions';

const fetchAttempt = actionCreator(types.FETCH_APPLICATIONS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_APPLICATIONS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_APPLICATIONS_FAILURE);

const postAttempt = actionCreator(types.POST_APPLICATION_ATTEMPT);
const postSuccess = actionCreator(types.POST_APPLICATION_SUCCESS);
const postFailure = actionCreator(types.POST_APPLICATION_FAILURE);

const deleteAttempt = actionCreator(types.DELETE_APPLICATION_ATTEMPT);
const deleteSuccess = actionCreator(types.DELETE_APPLICATION_SUCCESS);
const deleteFailure = actionCreator(types.DELETE_APPLICATION_FAILURE);

const alterAttempt = actionCreator(types.ALTER_APPLICATION_ATTEMPT);
const alterSuccess = actionCreator(types.ALTER_APPLICATION_SUCCESS);
const alterFailure = actionCreator(types.ALTER_APPLICATION_FAILURE);

const fetchByIdAttempt = actionCreator(types.FETCH_APPLICATION_BY_ID_ATTEMPT);
const fetchByIdSuccess = actionCreator(types.FETCH_APPLICATION_BY_ID_SUCCESS);
const fetchByIdFailure = actionCreator(types.FETCH_APPLICATION_BY_ID_FAILURE);

const UNAUTHORIZED = 401;

const fetchApplications = () => async (dispatch, _, services) => {
  dispatch(fetchAttempt());

  try {
    const { apps = [], total = 0 } = await services.applications.fetchApplications();
    dispatch(fetchSuccess({ apps, total }));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(fetchFailure(getError(err)));
  }
};

const fetchApplicationById = id => async (dispatch, _, services) => {
  dispatch(fetchByIdAttempt());

  try {
    const application = await services.applications.fetchApplicationById(id);
    dispatch(fetchByIdSuccess(application));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(fetchByIdFailure(getError(err)));
  }
};

const postApplication = application => async (dispatch, _, services) => {
  dispatch(postAttempt());

  try {
    const result = await services.applications.postApplication(application);
    dispatch(postSuccess(result));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(postFailure(getError(err)));
  }
};

const deleteApplicationById = id => async (dispatch, _, services) => {
  dispatch(deleteAttempt());

  try {
    await services.applications.deleteApplicationById(id);
    dispatch(deleteSuccess(id));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(deleteFailure(getError(err)));
  }
};

const alterApplication = (id, changes) => async (dispatch, _, services) => {
  dispatch(alterAttempt());

  try {
    const result = await services.applications.alterApplication(id, changes);
    dispatch(alterSuccess(result));
  } catch (err) {
    const status = getStatus(err);

    if (status === UNAUTHORIZED) {
      logout()(dispatch, _, services);
      return;
    }

    dispatch(alterFailure(getError(err)));
  }
};

const resetApplicationError = actionCreator(types.RESET_APPLICATION_ERROR);

export {
  fetchApplications,
  postApplication,
  deleteApplicationById,
  alterApplication,
  fetchApplicationById,
  resetApplicationError,
};

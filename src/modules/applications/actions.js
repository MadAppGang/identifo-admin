import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchAttempt = actionCreator(types.FETCH_APPLICATIONS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_APPLICATIONS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_APPLICATIONS_FAILURE);

const postAttempt = actionCreator(types.POST_APPLICATION_ATTEMPT);
const postSuccess = actionCreator(types.POST_APPLICATION_SUCCESS);
const postFailure = actionCreator(types.POST_APPLICATION_FAILURE);

const fetchApplications = () => async (dispatch, _, { applications }) => {
  dispatch(fetchAttempt());

  try {
    const list = await applications.fetchApplications();
    dispatch(fetchSuccess(list));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

const postApplication = application => async (dispatch, _, { applications }) => {
  dispatch(postAttempt());

  try {
    const result = await applications.postApplication(application);
    dispatch(postSuccess(result));
  } catch (err) {
    dispatch(postFailure(err));
  }
};

export {
  fetchApplications,
  postApplication,
};
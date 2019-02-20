import actionCreator from '@madappgang/action-creator';
import types from './types';

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

const fetchApplications = () => async (dispatch, _, { applications }) => {
  dispatch(fetchAttempt());

  try {
    const list = await applications.fetchApplications();
    dispatch(fetchSuccess(list));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

const fetchApplicationById = id => async (dispatch, _, { applications }) => {
  dispatch(fetchByIdAttempt());

  try {
    const application = await applications.fetchApplicationById(id);
    dispatch(fetchByIdSuccess(application));
  } catch (err) {
    dispatch(fetchByIdFailure(err));
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

const deleteApplicationById = id => async (dispatch, _, { applications }) => {
  dispatch(deleteAttempt());

  try {
    await applications.deleteApplicationById(id);
    dispatch(deleteSuccess(id));
  } catch (err) {
    dispatch(deleteFailure(err));
  }
};

const alterApplication = (id, changes) => async (dispatch, _, { applications }) => {
  dispatch(alterAttempt());

  try {
    const result = await applications.alterApplication(id, changes);
    dispatch(alterSuccess(result));
  } catch (err) {
    dispatch(alterFailure(err));
  }
};

export {
  fetchApplications,
  postApplication,
  deleteApplicationById,
  alterApplication,
  fetchApplicationById,
};

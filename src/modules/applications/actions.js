import actionCreator from '@madappgang/action-creator';
import types from './types';

const fetchAttempt = actionCreator(types.FETCH_APPLICATIONS_ATTEMPT);
const fetchSuccess = actionCreator(types.FETCH_APPLICATIONS_SUCCESS);
const fetchFailure = actionCreator(types.FETCH_APPLICATIONS_FAILURE);

const fetchApplications = () => async (dispatch, _, { applications }) => {
  dispatch(fetchAttempt());

  try {
    const list = await applications.fetchApplications();
    dispatch(fetchSuccess(list));
  } catch (err) {
    dispatch(fetchFailure(err));
  }
};

export {
  fetchApplications,
};

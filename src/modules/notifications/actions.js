import actionCreator from '@madappgang/action-creator';
import types from './types';

const createNotification = notification => ({
  type: types.CREATE_NOTIFICATION,
  payload: {
    ...notification,
    id: Date.now(),
  },
});

const removeNotification = actionCreator(types.REMOVE_NOTIFICATION);

export {
  createNotification,
  removeNotification,
};
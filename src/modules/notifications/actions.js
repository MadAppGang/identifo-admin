import actionCreator from '@madappgang/action-creator';
import types from './types';

const createNotification = actionCreator(types.CREATE_NOTIFICATION);
const removeNotification = actionCreator(types.REMOVE_NOTIFICATION);

export {
  createNotification,
  removeNotification,
};
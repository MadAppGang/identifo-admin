import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root';

const configureStore = (services) => {
  const middleware = applyMiddleware(
    thunk.withExtraArgument(services),
  );

  return createStore(rootReducer, middleware);
};

export default configureStore;

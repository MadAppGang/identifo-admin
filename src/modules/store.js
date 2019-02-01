import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = (rootReducer, services) => {
  const middleware = applyMiddleware(
    thunk.withExtraArgument(services),
  );

  const preloadedState = {
    auth: {
      authenticated: services.auth.isLoggedIn(),
    },
  };

  return createStore(rootReducer, preloadedState, middleware);
};

export default configureStore;

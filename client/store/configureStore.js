import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
};

export default configureStore;

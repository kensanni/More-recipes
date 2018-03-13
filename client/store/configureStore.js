import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/rootReducer';

/**
 * @description create redux store that holds the complete state tree of the application
 *
 * @param {object} initialState
 *
 * @returns {void} store which holds the complete state of the app
 */
const configureStore = initialState => ((
  createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  )
));

export default configureStore;

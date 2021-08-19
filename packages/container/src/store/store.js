import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

import rootReducer from './reducers';
import * as actions from './action-creators';

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ name: 'Test' }) ||
      compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axios)))
);

axios.__dispatch = store.dispatch;
store.__actions = actions;

export default store;

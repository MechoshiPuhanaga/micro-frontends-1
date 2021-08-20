import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import axios, { AxiosInstance } from 'axios';

import rootReducer from './reducers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  }
}

const composeEnhancers =
  process.env.NODE_ENV === 'production'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?.({ name: 'Test' }) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axios)))
);

declare global {
  interface AxiosInstanceEnhanced extends AxiosInstance {
    __dispatch?: typeof store.dispatch;
  }
}

(axios as AxiosInstanceEnhanced).__dispatch = store.dispatch;

export default store;

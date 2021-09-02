import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Workbox } from 'workbox-window';

import './styles';

import { store } from './store';
import App from './App';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('micro-frontend-container')
);

if ('serviceWorker' in navigator) {
  const serviceWorker = new Workbox('./sw.js');

  serviceWorker.register();
}

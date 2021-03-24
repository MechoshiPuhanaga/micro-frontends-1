import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';

import App from './App';

import './styles/index.scss';

const mount = (el, { defaultHistory, initialPath, onNavigate }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    });

  if (typeof onNavigate === 'function') {
    history.listen(onNavigate);
  }

  render(<App history={history} />, el);

  return {
    onParentNavigate: ({ pathname: newPathname }) => {
      const { pathname } = history.location;

      if (newPathname !== pathname) {
        history.push(newPathname);
      }
    }
  };
};

if (__mode__ === 'development') {
  const devRoot = document.getElementById('micro-frontend-auth');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount };

import React from 'react';
import { render } from 'react-dom';

//import './styles';

import App from './App';

import './styles/index.scss';

const mount = (el) => {
  render(<App />, el);
};

if (__mode__ === 'development') {
  const devRoot = document.getElementById('micro-frontend-auth');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };

import { render } from 'react-dom';
import { createBrowserHistory, createMemoryHistory, History, LocationListener } from 'history';

import App from './App';

import './styles/index.scss';

type THistory = History & { listen: Function };

const mount = (
  el: HTMLElement,
  {
    defaultHistory,
    initialPath,
    onNavigate
  }: {
    defaultHistory: THistory;
    initialPath: string;
    onNavigate: LocationListener<unknown> | null;
  }
) => {
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
    onParentNavigate: ({ pathname: newPathname }: { pathname: string }) => {
      const { pathname } = history.location;

      if (newPathname !== pathname) {
        history.push(newPathname);
      }
    }
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('micro-frontend-about');

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory(), initialPath: '', onNavigate: null });
  }
}

export { mount };

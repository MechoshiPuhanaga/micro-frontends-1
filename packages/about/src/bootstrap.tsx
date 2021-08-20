import { render } from 'react-dom';
import { createBrowserHistory, createMemoryHistory, History, LocationListener } from 'history';
import { Action, Store } from 'redux';
import { Provider } from 'react-redux';

import { DataProvider } from './providers';
import App from './App';

import './styles/index.scss';

import { actionCreators, store } from './store';

type THistory = History & { listen: Function };

const mount = (
  el: HTMLElement,
  {
    defaultHistory,
    initialPath,
    onNavigate,
    store,
    actions
  }: {
    defaultHistory: THistory;
    initialPath: string;
    onNavigate: LocationListener<unknown>;
    store: Store;
    actions: { [key: string]: Action };
  }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath]
    });

  history.listen(onNavigate);

  render(
    <Provider store={store}>
      <DataProvider value={{ actions }}>
        <App history={history} />
      </DataProvider>
    </Provider>,
    el
  );

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
    render(
      <Provider store={store}>
        <DataProvider value={{ actions: actionCreators }}>
          <App history={createBrowserHistory()} />
        </DataProvider>
      </Provider>,
      devRoot
    );
  }
}

export { mount };

import React, { lazy, memo, Suspense, useMemo } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';

const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));

import { resolveUrl } from '../../../shared';

import styles from './App.scss';

const App = ({ history }) => {
  const { paths } = useMemo(
    () =>
      resolveUrl({
        currentPath: history.location.pathname,
        routes: ['login', 'register']
      }),
    [history.location.pathname]
  );

  return (
    <main className={styles.App}>
      <h1>Auth</h1>
      <div className={styles.LogoReact} />
      <div className={styles.LogoJs} />
      <Router history={history}>
        <nav>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            isActive={(_, location) =>
              location.pathname.indexOf(paths.login) === 0
            }
            to={paths.login}
          >
            Login
          </NavLink>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            isActive={(_, location) =>
              location.pathname.indexOf(paths.register) === 0
            }
            to={paths.register}
          >
            Register
          </NavLink>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={paths.login} component={LazyLogin} />
            <Route path={paths.register}>
              <LazyRegister history={history} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default memo(App);

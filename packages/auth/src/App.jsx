import React, { lazy, memo, Suspense, useMemo } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';

const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));

import styles from './App.scss';

const ROUTES = ['/login', '/register'];

const App = ({ history }) => {
  const baseUrl = useMemo(() => {
    let baseUrl = history.location.pathname;

    for (let route of ROUTES) {
      const lastIndexOfRoute = history.location.pathname.lastIndexOf(route);

      if (lastIndexOfRoute !== -1) {
        baseUrl = history.location.pathname.slice(0, lastIndexOfRoute);

        break;
      }
    }

    if (baseUrl === '/') {
      baseUrl = '';
    }

    return baseUrl;
  }, []);

  const paths = useMemo(
    () => ({
      login: `${baseUrl}/login`,
      register: `${baseUrl}/register`
    }),
    [history?.location?.pathname]
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
            <Route path={paths.register} component={LazyRegister} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default memo(App);

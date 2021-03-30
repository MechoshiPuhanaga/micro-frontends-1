import React, { lazy, memo, Suspense } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';

const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));

import styles from './App.scss';

const App = ({ history }) => {
  return (
    <main className={styles.App}>
      <h1>Auth</h1>
      <div className={styles.LogoJs} />
      <div className={styles.LogoReact} />

      <Router history={history}>
        <nav>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            to="/login"
          >
            Login
          </NavLink>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            to="/register"
          >
            Register
          </NavLink>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login" component={LazyLogin} />
            <Route path="/register" component={LazyRegister} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default memo(App);

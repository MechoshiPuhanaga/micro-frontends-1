import React, { Suspense } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import { LazyAbout, LazyAuth, LazyDashboard, LazyHome } from '@pages';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.AppContainer}>
      <h1>Container App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <nav>
            <NavLink
              className={styles.Link}
              activeClassName={styles.LinkActive}
              exact
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={styles.Link}
              activeClassName={styles.LinkActive}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={styles.Link}
              activeClassName={styles.LinkActive}
              exact
              to="/about"
            >
              About
            </NavLink>
            <NavLink
              className={styles.Link}
              activeClassName={styles.LinkActive}
              exact
              to="/login"
            >
              Login
            </NavLink>
            <NavLink
              className={styles.Link}
              activeClassName={styles.LinkActive}
              exact
              to="/register"
            >
              Register
            </NavLink>
          </nav>
          <Switch>
            <Route path="/dashboard" component={LazyDashboard} />
            <Route path="/about" component={LazyAbout} />
            <Route path="/login" component={LazyAuth} />
            <Route path="/register" component={LazyAuth} />
            <Route path="/" component={LazyHome} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
};

export default App;

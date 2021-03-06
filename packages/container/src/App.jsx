import React, { Suspense } from 'react';
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom';

import { LazyAbout, LazyAuth, LazyDashboard, LazyHome, LazyTeam } from '@pages';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.App}>
      <h1>Container App</h1>
      <div>
        <div className={styles.LogoReact} />
        <div className={styles.LogoJs} />
      </div>

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
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            to="/team"
          >
            Team
          </NavLink>
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
            <Route path="/dashboard" component={LazyDashboard} />
            <Route path="/about" component={LazyAbout} />
            <Route path="/team" component={LazyTeam} />
            <Route path="/login" component={LazyAuth} />
            <Route path="/register" component={LazyAuth} />
            <Route path="/" component={LazyHome} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </main>
  );
};

export default App;

import React, { Suspense } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import { LazyAuth, LazyDashboard, LazyHome } from '@pages';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.App}>
      <h1>Container App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
          <Switch>
            <Route path="/dashboard" component={LazyDashboard} />
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

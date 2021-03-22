import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

const LazyLogin = lazy(() => import('./pages/Login/Login'));
const LazyRegister = lazy(() => import('./pages/Register/Register'));

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.App}>
      <h1>Auth</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
          <Switch>
            <Route path="/login" component={LazyLogin} />
            <Route path="/register" component={LazyRegister} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
};

export default App;

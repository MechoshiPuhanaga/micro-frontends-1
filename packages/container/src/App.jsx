import React, { Suspense } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import { LazyAuth, LazyHome } from '@pages';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.App}>
      <h1>Container App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
          <Route path="/login" component={LazyAuth} />
          <Route path="/register" component={LazyAuth} />
          <Route path="/" component={LazyHome} />
        </BrowserRouter>
      </Suspense>
    </main>
  );
};

export default App;

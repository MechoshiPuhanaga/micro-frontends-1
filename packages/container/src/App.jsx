import React from 'react';

import { AuthApp } from '@components';

import styles from './App.scss';

const App = () => {
  return (
    <main className={styles.App}>
      <h1>Container App :)</h1>
      <AuthApp />
    </main>
  );
};

export default App;

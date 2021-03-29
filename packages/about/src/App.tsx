import { FC, memo } from 'react';

import { Dashboard } from '@components';

import styles from './App.scss';

const App: FC<{ history: History | unknown }> = () => {
  return (
    <div className={styles.AppAbout}>
      <h1>About</h1>
      <div className={styles.Logo} />
      {/* <Dashboard /> */}
    </div>
  );
};

export default memo(App);

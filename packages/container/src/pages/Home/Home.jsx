import React, { memo } from 'react';

import styles from './Home.scss';

const Home = () => {
  return (
    <div className={styles.Home}>
      <h1>Home page</h1>
      <div className={styles.Logo} />
    </div>
  );
};

export default memo(Home);

import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators } from '../../store';

import styles from './Home.scss';

const Home = () => {
  const dispatch = useDispatch();
  const repositories = useSelector((state) => state.repositories);

  return (
    <div className={styles.Home}>
      <h1>Home page</h1>
      <div className={styles.Logo} />
      <ul className={styles.List}>
        {repositories?.data.map((repo) => (
          <li
            key={repo}
            className={styles.ListEl}
            onClick={() => dispatch(actionCreators.deleteRepository(repo))}
          >
            {repo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(Home);

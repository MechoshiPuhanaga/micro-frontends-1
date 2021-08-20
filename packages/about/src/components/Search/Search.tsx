import { FC, memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useData } from '../../providers';

import styles from './Search.scss';

const Search: FC = (props) => {
  const {
    actions: { deleteRepository, searchRepositories }
  } = useData();
  const dispatch = useDispatch();

  const repositories = useSelector(
    (state: { repositories: { data: string[] } }) => state.repositories
  );

  const [term, setTerm] = useState('');

  const onSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch(searchRepositories(term));
    },
    [term]
  );

  return (
    <>
      <h1>Search</h1>
      <div className={styles.Search}>
        <form onSubmit={onSubmit}>
          <input className={styles.Input} value={term} onChange={(e) => setTerm(e.target?.value)} />
          <button className={styles.SubmitBtn}>Submit</button>
        </form>
        <ul className={styles.List}>
          {repositories?.data.map((repo: string) => (
            <li
              key={repo}
              className={styles.ListEl}
              onClick={() => dispatch(deleteRepository(repo))}
            >
              {repo}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default memo(Search);

import React, { memo, Suspense, useCallback, useMemo, useState } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { resolveUrl } from '../../../../../../../shared';

import { LazyCustomEmployee } from './components';

import styles from './Employee.scss';

const Employee = ({ history }) => {
  const { paths } = useMemo(
    () =>
      resolveUrl({
        currentPath: history.location.pathname,
        routes: ['customEmployee']
      }),
    [history.location.pathname]
  );

  const [param, setParam] = useState('');

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      history.push(`${paths.customEmployee}/${param}`);
    },
    [history, param, paths.customEmployee]
  );

  return (
    <div className={styles.Employee}>
      <h1>Employee</h1>
      <form className={styles.Form} onSubmit={onSubmit}>
        <input
          className={styles.Input}
          value={param}
          onChange={(e) => setParam(e.target.value)}
        />
        <button className={styles.GoToBtn} type="submit">
          Go To
        </button>
      </form>
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={`${paths.customEmployee}/:id`}>
              <LazyCustomEmployee history={history} setParam={setParam} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default memo(Employee);

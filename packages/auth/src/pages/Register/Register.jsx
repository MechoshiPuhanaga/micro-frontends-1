import React, { memo, Suspense, useMemo } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';

import { resolveUrl } from '../../../../../shared';
import { LazyEmployee, LazyEmployer } from './components';

import styles from './Register.scss';

const Register = ({ history }) => {
  const { paths } = useMemo(
    () =>
      resolveUrl({
        currentPath: history.location.pathname,
        routes: ['employee', 'employer']
      }),
    [history.location.pathname]
  );

  return (
    <div className={styles.Container}>
      <h1>Register</h1>
      <Router history={history}>
        <nav>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            isActive={(_, location) =>
              location.pathname.indexOf(paths.employee) === 0
            }
            to={paths.employee}
          >
            Employee
          </NavLink>
          <NavLink
            className={styles.Link}
            activeClassName={styles.LinkActive}
            isActive={(_, location) =>
              location.pathname.indexOf(paths.employer) === 0
            }
            to={paths.employer}
          >
            Employer
          </NavLink>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={paths.employee} component={LazyEmployee} />
            <Route path={paths.employer} component={LazyEmployer} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default memo(Register);

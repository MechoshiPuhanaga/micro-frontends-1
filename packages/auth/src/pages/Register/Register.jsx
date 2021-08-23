import React, { memo, Suspense, useMemo } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';

import { LazyEmployee, LazyEmployer } from './components';

import styles from './Register.scss';

const ROUTES = ['/employee', '/employer'];

const Register = ({ history }) => {
  const baseUrl = useMemo(() => {
    let baseUrl = history.location.pathname;

    for (let route of ROUTES) {
      const lastIndexOfRoute = history.location.pathname.lastIndexOf(route);

      if (lastIndexOfRoute !== -1) {
        baseUrl = history.location.pathname.slice(0, lastIndexOfRoute);

        break;
      }
    }

    if (baseUrl === '/') {
      baseUrl = '';
    }

    return baseUrl;
  }, []);

  const paths = useMemo(
    () => ({
      employee: `${baseUrl}/employee`,
      employer: `${baseUrl}/employer`
    }),
    [history?.location?.pathname]
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

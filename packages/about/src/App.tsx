import { FC, memo, Suspense, useMemo } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import { History } from 'history';

import { LazyContacts, LazyProfile, LazySearch } from './components';
import { LazyAuth } from './pages';

import { resolveUrl } from '../../../shared';

import styles from './App.scss';

const App: FC<{ history: History }> = ({ history }) => {
  const { paths } = useMemo(
    () =>
      resolveUrl({
        currentPath: history.location.pathname,
        routes: ['auth', 'contacts', 'profile', 'search']
      }),
    [history.location.pathname]
  );

  return (
    <main className={styles.App}>
      <h1>About</h1>
      <div className={styles.LogoReact} />
      <div className={styles.LogoTs} />
      <Router history={history}>
        <nav>
          <NavLink
            activeClassName={styles.LinkActive}
            className={styles.Link}
            isActive={(_, location) => location.pathname.indexOf(paths.profile) === 0}
            to={paths.profile}
          >
            Profile
          </NavLink>
          <NavLink
            activeClassName={styles.LinkActive}
            className={styles.Link}
            isActive={(_, location) => location.pathname.indexOf(paths.search) === 0}
            to={paths.search}
          >
            Search
          </NavLink>
          <NavLink
            activeClassName={styles.LinkActive}
            className={styles.Link}
            isActive={(_, location) => location.pathname.indexOf(paths.contacts) === 0}
            to={paths.contacts}
          >
            Contacts
          </NavLink>
          <NavLink
            activeClassName={styles.LinkActive}
            className={styles.Link}
            isActive={(_, location) => location.pathname.indexOf(paths.auth) === 0}
            to={paths.auth}
          >
            Auth
          </NavLink>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={paths.profile} component={LazyProfile} />
            <Route path={paths.search} component={LazySearch} />
            <Route path={paths.contacts} component={LazyContacts} />
            <Route path={paths.auth} component={LazyAuth} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default memo(App);

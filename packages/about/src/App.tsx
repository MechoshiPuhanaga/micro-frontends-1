import { FC, memo, Suspense, useEffect, useCallback, useMemo, useState } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import { History } from 'history';

import { LazyContacts, LazyProfile } from './components';

import styles from './App.scss';

const App: FC<{ history: History }> = ({ history }) => {
  const updateActiveLinks = useCallback(() => {
    return {
      profile: ['/profile', '/about/profile'].some((el) => el === history.location.pathname),
      contacts: ['/contacts', '/about/contacts'].some((el) => el === history.location.pathname)
    };
  }, [history?.location?.pathname]);

  const [activeLinks, setActiveLinks] = useState(updateActiveLinks());

  useEffect(() => {
    console.log('mount');

    history.listen(() => {
      setActiveLinks(updateActiveLinks());
    });
  }, []);

  return (
    <main className={styles.App}>
      <h1>About</h1>
      <div className={styles.LogoTs} />
      <div className={styles.LogoReact} />

      <Router history={history}>
        <nav>
          <NavLink
            className={`${styles.Link} ${activeLinks.profile ? styles.LinkActive : ''}`}
            to="/profile"
          >
            Profile
          </NavLink>
          <NavLink
            className={`${styles.Link} ${activeLinks.contacts ? styles.LinkActive : ''}`}
            to="/contacts"
          >
            Contacts
          </NavLink>
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={['/profile', '/about/profile']} component={LazyProfile} />
            <Route path={['/contacts', '/about/contacts']} component={LazyContacts} />
          </Switch>
        </Suspense>
      </Router>
    </main>
  );
};

export default memo(App);

import { FC, memo, Suspense } from 'react';
import { NavLink, Route, Router, Switch } from 'react-router-dom';
import { History } from 'history';

import { LazyContacts, LazyProfile } from './components';

import styles from './App.scss';

const App: FC<{ history: History }> = ({ history }) => {
  console.log('ABOUT history.location: ', history.location);
  return (
    <main className={styles.App}>
      <h1>About</h1>
      <div className={styles.Logo} />
      <Suspense fallback={<div>Loading...</div>}>
        <Router history={history}>
          <nav>
            <NavLink className={styles.Link} activeClassName={styles.LinkActive} to="/profile">
              Profile
            </NavLink>
            <NavLink className={styles.Link} activeClassName={styles.LinkActive} to="/contacts">
              Contacts
            </NavLink>
          </nav>
          <Switch>
            <Route path={['/profile', '/about/profile']} component={LazyProfile} />
            <Route path={['/contacts', '/about/contacts']} component={LazyContacts} />
          </Switch>
        </Router>
      </Suspense>
    </main>
  );
};

export default memo(App);

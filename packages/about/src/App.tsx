import { FC, memo } from 'react';

import { Dashboard } from '@components';

const App: FC<{ history: History | unknown }> = () => {
  return (
    <>
      <h1>Hello from App!</h1>
      <Dashboard />
    </>
  );
};

export default memo(App);

import { FC, memo, useCallback, useState } from 'react';

import colors from '@styles/shared/_variables.scss';

import classes from './Dashboard.scss';

const Dashboard: FC = () => {
  const [text, setText] = useState('');
  let onClick = () => {};

  onClick = useCallback(() => {
    console.log('text: ', text);
  }, []);

  return (
    <>
      <h1 className={classes.Dashboard} style={{ color: colors.color2 }}>
        Hello from Dashboard!
      </h1>
      <button onClick={onClick}>Click Me</button>
      <input value={text} onChange={(e) => setText(e.target?.value)} />
    </>
  );
};

export default memo(Dashboard);

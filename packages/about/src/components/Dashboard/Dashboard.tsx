import { FC, memo } from 'react';

import colors from '@styles/shared/_variables.scss';

import classes from './Dashboard.scss';

const Dashboard: FC = () => {
  return <div className={classes.Dashboard} style={{ color: colors.color2 }} />;
};

export default memo(Dashboard);

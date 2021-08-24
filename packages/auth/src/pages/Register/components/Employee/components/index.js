import { lazy } from 'react';

export const LazyCustomEmployee = lazy(() =>
  import('./CustomEmployee/CustomEmployee')
);

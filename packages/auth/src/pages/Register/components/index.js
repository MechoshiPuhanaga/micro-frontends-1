import { lazy } from 'react';

export const LazyEmployee = lazy(() => import('./Employee/Employee'));
export const LazyEmployer = lazy(() => import('./Employer/Employer'));

import { lazy } from 'react';

export const LazyAuth = lazy(() => import('./Auth/Auth.jsx'));
export const LazyDashboard = lazy(() => import('./Dashboard/Dashboard.jsx'));
export const LazyHome = lazy(() => import('./Home/Home.jsx'));

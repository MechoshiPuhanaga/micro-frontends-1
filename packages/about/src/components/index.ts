import { lazy } from 'react';

export const LazyContacts = lazy(() => import('./Contacts/Contacts'));
export const LazyProfile = lazy(() => import('./Profile/Profile'));

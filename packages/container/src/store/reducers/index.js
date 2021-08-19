import { combineReducers } from 'redux';

import repositoriesReducer from './repositories';

const reducers = combineReducers({ repositories: repositoriesReducer });

export default reducers;

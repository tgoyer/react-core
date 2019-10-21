import { combineReducers } from 'redux';

import appState from './appState';
import data from './data';
import projects from './projects';
import tasks from './tasks';
import users from './users';

export const rootReducer = combineReducers({
    appState,
    data,
    projects,
    tasks,
    users
});
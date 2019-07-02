import { combineReducers } from 'redux';

import dataStore from './data';
import userStore from './user';

export const rootReducer = combineReducers({
    data: dataStore,
    user: userStore
});